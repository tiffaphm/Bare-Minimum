import scriptLoader from 'react-async-script-loader';
import GoogleApiKey from "../GoogleApiKey.jsx";

const GeneralMarkerStyle = {
  position: 'absolute',
  width: 25,
  height: 25,
  backgroundColor: 'red',
  textAlign: 'center',
  fontSize: 16,
  color: '#fff',
  paddingTop: 2,
  borderRadius: '50%',
  border: '1px solid white',
  boxShadow: '0 0.5px 0.5px rgba(0, 0, 0, 0.8)',
  zIndex: -1
};

const GeneralMarkerHoverStyle = {
  position: 'absolute',
  width: 25,
  height: 25,

  backgroundColor: 'red',
  textAlign: 'center',
  fontSize: 16,
  color: '#fff',
  paddingTop: 2,
  borderRadius: '50%',
  border: '1px solid white',
  boxShadow: '0 0.5px 0.5px rgba(0, 0, 0, 0.8), 0 0 0 9px rgba(255, 255, 255, 0.7)',
  zIndex: -1
};

// class GeneralMarker extends google.maps.OverlayView {
//   constructor(latlng, map, args) {
//     super();
//     this.latlng = latlng;
//     this.args = args;
//     this.setMap(map);
//   }
  // const GeneralMarkerStyle = {
  //   div.style.position = 'absolute';
  //   div.style.cursor = 'pointer';
  //   div.style.width = '25px';
  //   div.style.height = '25px';
  //   div.style.backgroundColor = 'red';
  //   div.style.textAlign = 'center';
  //   div.style.fontSize = '16';
  //   div.style.color = '#fff';
  //   div.style.paddingTop = '2';
  //   div.style.borderRadius = '50%';
  //   div.style.border = '1px solid white';
  //   div.style.boxShadow = '0 0.5px 0.5px rgba(0, 0, 0, 0.8)';
  //   div.style.zIndex = '-1';
  // }

//   draw() {
//     let self = this;
//     let div = this.div;
//     if (!div) {
//       div = this.div = document.createElement('div');
//       div.className = 'general-marker';

//       div.style = GeneralMarkerStyle;

//       if (typeof(self.args.marker_id) !== 'undefined') {
//         div.dataset.marker_id = self.args.marker_id;
//       }

//       google.maps.event.addDomListener(div, 'click', () => {
//         google.maps.event.trigger(self, 'click');
//       });

//       let panes = this.getPanes();
//       panes.overlayImage.appendChild(div);
//     }
//   }
//     // let point = this.getProjection().fromLatLngToDivPixel(this.latlng);

//     // if (point) {
//     //   div.style.left = point.x + 'px';
//     //   div.style
// }

export default { GeneralMarkerStyle, GeneralMarkerHoverStyle };


