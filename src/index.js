import React from 'react';
import ReactDOM from 'react-dom';
import alertify from 'alertifyjs';
// import {O2OProtocol} from 'o2oprotocol';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

// Import Typehead component for autocomplete input.
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

// const ipfsConfig = {
//   ipfsDomain: '172.16.20.121',
//   ipfsApiPort: '5001',
//   ipfsGatewayPort: '8080',
//   ipfsProtocol: 'http'
// }

// window.ipfsConfig = ipfsConfig;

// const initO2O = async() => {
//   const {web3} = window;
//   window.o2o = new O2OProtocol({web3, ipfsConfig});
//   console.log('o2oprotocol was initialized!');
// }

// if (window.addEventListener) {
//   window.addEventListener('load', initO2O);
// } else {
//   window.attachEvent('onload', initO2O);
// }

// setup alertify position
alertify.set('notifier', 'position', 'top-right');

ReactDOM.render(
  <App/>, document.getElementById('root'));
registerServiceWorker();
