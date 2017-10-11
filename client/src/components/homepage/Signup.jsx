import React from 'react';

const Signup = (props) => (
  <div className="container">
    <div className="card card-register mx-auto mt-5">
      <div className="card-header">register an account</div>
      <div className="card-body">
        <form action="/signup" method="post">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">name</label>
            <input className="form-control" type="text" name="name" placeholder="enter name" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input className="form-control" type="text" name="email" placeholder="enter email" />
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col-md-6">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input className="form-control" type="password" name="password" placeholder="Password" />
              </div>
              <div className="col-md-6">
                <label htmlFor="exampleConfirmPassword">Confirm password</label>
                <input className="form-control" type="password" placeholder="Confirm password" />
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-block" type="submit" value="Submit">register</button>
        </form>
        <div className="text-center">
          <a className="d-block small mt-3" onClick={e => props.changeMode(true)}>Login Page</a>
          <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
        </div>
      </div>
    </div>
  </div>
);

export default Signup;