import React from 'react';

const Signup = (props) => (
  <div className="col-md-4 col-md-offset-4 credentials-box">
    <h3>Sign up here:</h3>
    <form action="/signup" method="post">

      <div className="form-entry">
        <label>Name: </label>
        <input className="field" type="text" name="name"/>
      </div>

      <div className="form-entry">
        <label>E-Mail: </label>
        <input className="field" type="text" name="email"/>
      </div>

      <div className="form-entry">
        <label>Password: </label>
        <input className="field" type="password" name="password"/>
      </div>

      <div className="form-entry">
        <Button type="submit" value="Submit">Submit</Button>
      </div>
    </form>
  </div>
);

export default Signup;
