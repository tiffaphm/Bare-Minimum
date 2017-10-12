import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/homepage/Login.jsx';
import Signup from './components/homepage/Signup.jsx';

import '../dist/vendor/bootstrap/css/bootstrap.css';
import '../dist/stylesheet.css';
import '../dist/sb-admin.css';

const serverURL = HOSTNAME;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogin: true
    };
  }

  changeMode (boolean) {
    this.setState({
      userLogin: boolean
    });
  }

  render() {
    return (
      <div>
        <div className="fullscreen-bg">
          <video loop muted autoPlay poster="./images/10K_Feet.jpg" className="fullscreen-bg__video">
            <source src="./images/10K_Feet.webm" type="video/webm" />
          </video>
        </div>
        {
          this.state.userLogin ?
            <Login changeMode={this.changeMode.bind(this)}/> :
            <Signup changeMode={this.changeMode.bind(this)}/>
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
