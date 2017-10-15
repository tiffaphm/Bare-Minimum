import React from 'react';
import reducer from '../../Reducers';

const buttonType = ['bg-primary', 'bg-warning', 'bg-success', 'bg-danger', 'bg-primary', 'bg-warning'];

const TripNavBar = (props) => {
  return (
    <div className="trip-buttons-container">
      <div className="row">
        {
          props.features.map((feature, index) => 
            <div className="col-xl-3 col-sm-6 mb-3" key={index}>
              <div className={`card text-white ${buttonType[index]} o-hidden h-100`}>
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fa fa-fw fa-comments"></i>
                  </div>
                  <div className="mr-5"></div>
                </div>
                <a className="card-footer text-white clearfix small z-1" href="#">
                  <span onClick={() => {
                    props.dispatch(reducer.changeView(feature.link));
                  }} className="float-left">{feature.name}</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>)
        }
      </div>
    </div>
  );
};

export default TripNavBar;
