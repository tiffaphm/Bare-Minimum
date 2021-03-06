const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('../database/index.js');
const query = require('../database/queryHelpers.js');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const http = require('http').Server(app);
const dummyData = require('../database/dummyData.js');
// export before require loop
module.exports = http;
const io = require('./socket.js');
// Express Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, samesite: false },
  store: new SequelizeStore({
    db: db.db,
    table: 'Sessions'
  })
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local-signin', new Strategy({
  usernameField: 'email'
},

function(email, password, done) {
  db.Users.findOne({ where: {email: email} })
    .then( (user) => {
      if (!user) { return done(null, false); }
      if (user.dataValues.password !== password) { return done(null, false); }
      return done(null, user.dataValues);
    });
}
));

//on every single get request, check for session and direct to appropriate page
app.use((req, res, next) => {
  if (req.session.user) {
    if (req.url === '/') {
      res.redirect('/dashboard');
    } else {
      next();
    }
  } else {
    next();
  }
});

//do not serve static files until AFTER cookies have been checked
app.use(express.static(__dirname + '/../client/dist'));

//Routes
app.post('/login', passport.authenticate('local-signin'), function(req, res) {
  req.session.user = req.body.email;
  query.addSession(req.session.id, req.body.email);
  res.redirect('/dashboard');
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Couldn\'t destroy session:', err);
      res.status(500).end('You are trapped in this app.');
    } else {
      console.log('Session destroyed');
      //clean the cookie
      res.cookie('connect.sid', '', { expires: new Date() });
      res.redirect('/');
    }
  });
});

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.contentType('text/html');
    res.status(200).sendFile(path.resolve(__dirname + '/../client/dist/dashboard.html'));
  } else {
    res.status(403).redirect('/');
  }
});

app.get('/loginuser', (req, res) => {
  let option = {name: req.session.user};
  query.findUserByEmail(option, (result) => {
    return res.status(200).send(result);
  });
});

app.post('/jointrip', (req, res) => {
  query.joinTrip(req.body, (err) => {
    if (err) {
      res.status(400).end(err);
    } else {
      return res.status(200).end();
    }
  });
});

app.get('/fetchtrips', (req, res) => {
  query.findTripsForUser(req.query.userId)
    .then((result) => {
      let finalResult = result.map((ele) => ele.dataValues);
      // console.log('Trips for user:', finalResult);
      res.status(200).send(finalResult);
      return null;
    })
    .catch((err) => {
      res.status(500).end();
    });
});

//on successful login or signup, issue new session
//create a cookie by assigining req.session.user to something (this occurs both in /signup and /login)
app.post('/signup', (req, res) => {
  query.addUser(req.body, (err) => {
    if (err) {
      res.status(400).send('Bad signup request. Username may be taken.');
    } else {
      req.session.user = req.body.email;
      query.addSession(req.session.id, req.body.email);
      res.redirect('/dashboard');
    }
  });
});

app.post('/vote', (req, res) => {
  db.Votes.create(req.body)
    .then(() => {
      return res.status(200).end();
    })
    .catch((err) => {
      console.log('error in vote insertion', err);
    });
});

app.post('/landmarks', (req, res) => {

  console.log('this is landmarks submission ', req.body);
  query.addLandmark(req.body, (err, result) => {
    if (err) {
      console.log('there was error on landmarks submission ', err);
    }
    return res.status(200).send('submission successful');
  });
});

app.get('/landmarks', (req, res) => {
  let tripId = req.url.split('=')[1];
  query.findLandmarks(tripId, (landmarks) => {
    return res.status(200).send(landmarks);
  });
});

app.post('/expense', (req, res) => {
  query.createExpense(req.body)
    .then((notification) => {
      // TODO: send notification through socket;
      io.sendNotification(notification);
      res.status(200).end();
      return null;
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.get('/expense', (req, res) => {
  console.log('Got an expense fetch.', req.query);
  query.getExpensesForTrip(req.query.tripId).then((result) => {
    let finalResult = result.map((ele) => ele.dataValues);
    res.status(200).send(finalResult);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// **** Trip-Specific Data Retrieval ****

// GET userlist for trip
app.get('/tripusers/:tripId', (req, res) => {
  const tripId = req.params.tripId;
  query.findUsersOnTrip(tripId)
    .then((results) => {
      return res.status(200).json(results);
    });
});

// GET trip specific user itinerary, phone NO LONGER USED
app.get('/userinfo/:userId/:tripId', (req, res) => {
  console.log('getting userinfo');
  const tripId = req.params.tripId;
  const userId = req.params.userId;

  query.getUserTripDetails(userId, tripId, (results) => {
    return res.send(results);
  });
});

app.patch('/userinfo/:userId/:tripId/:itinerary/:phone', (req, res) => {
  console.log('setting userinfo');
  const tripId = req.params.tripId;
  const userId = req.params.userId;
  const itinerary = req.params.itinerary;
  const phone = req.params.phone;

  query.updateUserTripDetails(userId, tripId, itinerary, phone, (results) => {
    return res.send(results);
  });
});

//Helper Functions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.Users.findById(id)
    .then( (user) => {
      done(null, user.dataValues);
    });
});

app.post('/popup', (req, res) => {

  query.createTrip(req.body, (id, err) => {
    if (err) {
      res.status(400).send('Trip name already exist, please try a new name.');
    } else {
      return res.status(201).send(id);
    }
  });
});



//////////////////////////////////////////////////////////////////////////////////////
////                                     Q-DOT                                    ////
//////////////////////////////////////////////////////////////////////////////////////


app.post('/dummydata', (req, res) => {
  dummyData.addData()
    .then(() => res.send(200))
    .catch(err => {
      console.log('error adding dummy data', err);
      res.status(400).send('FAILED - Add dummy data');
    });
});

//get trip photos from database
app.get('/photos', (req, res) => {
  query.findPhotos(req.query)
    .then(result => {
      res.send(result);
      return null;
    })
    .catch(err => {
      console.log('error finding photo', err);
      res.status(400).send('FAILED to get photos');
    });
});

//add trip photos to database
app.post('/photos', (req, res) => {
  query.addPhotos(req.body.images)
    .then(result => {
      console.log('added all photos to database', result);
      // TODO: send notification through socket;
      res.status(201).end();
      return null;
    })
    .catch(err => {
      console.log('error adding all images to database', err);
      res.status(418).send('Adding photos to database failed');
    });
});

app.get('/notifications', (req, res) => {
  if (req.query.tripId) {
    query.getNotificationForTrip(req.query.tripId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).end(err.toString());
      });
  } else if (req.query.userId) {
    query.getNotificationForUser(req.query.userId)
      .then((result) => {
        res.status(200).json(result);
        return null;
      })
      .catch((err) => {
        res.status(500).end();
      });
  } else {
    res.status(400).end();
  }
});

app.post('/placesofinterest', (req, res) => {
  query.addPlaceOfInterest(req.body)
    .then((result) => {
      console.log('added place to database', result);
      res.send(201);
    })
    .catch((error) => {
      console.log('there was an error adding places to database', error);
      res.send(400);
    })
})

app.get('/placesofinterest', (req, res) => {
  if (req.query.tripId) {
    query.getPlacesOfInterest(req.query.tripId)
      .then((result) => {
        res.send(result)
      })
      .catch((error) => {
        res.send(400);
      })
  }
})

const redirectUnmatched = (req, res) => {
  res.redirect(process.env.HOSTNAME + '/');
};

app.use(redirectUnmatched);

// no express app listen for socket.io
// app.listen(process.env.PORT, () => {
//   console.log('listening to port ', process.env.PORT);
// });

http.listen(process.env.PORT, () => {
  console.log('listening to port ', process.env.PORT);
});
