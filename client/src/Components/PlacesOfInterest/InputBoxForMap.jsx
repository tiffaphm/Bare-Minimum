import React from 'react';

class InputBoxForMap extends React.Component {

  saveDataForPlaceOfInterest() {
    //post request here
    console.log('kweh! saved!')
  }

  render() {
    return (
      <div className="input-location-information-container">
        <div ref="form">
          <table>
            <tr><td>name:</td> <td><input type='text' id='name'/></td></tr>
            <tr><td>address:</td> <td><input type='text' id='address'/></td></tr>
            <tr><td>type:</td> <td><input type='text' id='type'/></td></tr>
            <tr><td>notes:</td> <td><input type='text' id='notes'/></td></tr>
            <tr><td></td><td><input type='button' value='Save' onClick={this.saveDataForPlaceOfInterest}/></td></tr>
          </table>
        </div>
        <div id="saved-message">Saved!</div>
      </div>
    )
  }
};

// InputBoxForMap.proptypes = {
//   placeholder: PropTypes.string,
//   onPlacesChanged: PropTypes.func
// };

export default InputBoxForMap;