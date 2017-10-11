import React from 'react';

const Login = (props) => (
  <div className="col-md-4 col-md-offset-4 credentials-box">
    <h3>Login here:</h3>
    <form action="/login" method="post">

      <div className="form-entry">
        <label>E-Mail: </label>
        <input className="field" type="text" name="email"/>
      </div>

      <div className="form-entry">
        <label>Password: </label>
        <input className="field" type="password" name="password"/>
      </div>

      <div className="form-entry">
        <button type="submit" value="Submit">Submit</button>
      </div>
    </form>
  </div>
);

export default Login;
