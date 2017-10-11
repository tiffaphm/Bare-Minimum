import React from 'react';

const Login = (props) => (
  <div className="container">
    <div className="card card-login mx-auto mt-5">
      <div className="card-header">
      travels.
        <p className='card-header-subquote'>by the eggs, coffee & toast team</p>
      </div>
      <div className="card-body">
        <form action="/login" method="post">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">email address</label>
            <input className="form-control" type="email" placeholder="Enter email" name="email"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">password</label>
            <input className="form-control" type="password" placeholder="Password" name="password"/>
          </div>
          <button className="btn btn-primary btn-block" type="submit" value="Submit">Login</button>
        </form>
        <div className="text-center">
          <a className="d-block small mt-3" onClick={e => props.changeMode(false)}>Register an Account</a>
          <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
        </div>
      </div>
    </div>
  </div>
);

export default Login;