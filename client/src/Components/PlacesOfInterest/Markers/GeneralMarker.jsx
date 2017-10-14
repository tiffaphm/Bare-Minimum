const GeneralMarkerStyle = {
  position: 'absolute',
  width: 25,
  height: 25,
  left: -10,
  top: -10,

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
  left: -10,
  top: -10,

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

export default { GeneralMarkerStyle, GeneralMarkerHoverStyle };