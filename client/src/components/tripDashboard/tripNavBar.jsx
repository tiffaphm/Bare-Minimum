import React from 'react';
import reducer from '../../Reducers';
import $ from 'jquery';

const buttonType = ['bg-primary', 'bg-warning', 'bg-success', 'bg-danger', 'bg-primary', 'bg-warning'];

const TripNavBar = (props) => {
  return (
    <div className="trip-buttons-container">
      <a onClick={() => {
        props.dispatch(reducer.changeView(props.features[0].link));
      }}><i className="fa fa-fw fa-bars"></i> {props.features[0].name}</a>
      <a onClick={() => {
        props.dispatch(reducer.changeView(props.features[1].link));
      }}><i className="fa fa-fw fa-credit-card"></i> {props.features[1].name}</a>
      <a onClick={() => {
        props.dispatch(reducer.changeView(props.features[2].link));
      }}><i className="fa fa-fw fa-picture-o"></i> {props.features[2].name}</a>
      <a onClick={() => {
        props.dispatch(reducer.changeView(props.features[3].link));
      }}><i className="fa fa-fw fa-map"></i> {props.features[3].name}</a>
    </div>
  );
};

export default TripNavBar;

