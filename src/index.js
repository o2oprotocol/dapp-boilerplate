import React from 'react';
import ReactDOM from 'react-dom';
import alertify from 'alertifyjs';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

// Import Typehead component for autocomplete input.
import './index.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import 'react-select/dist/react-select.css';

// setup alertify position
alertify.set('notifier', 'position', 'top-right');

ReactDOM.render(
  <App/>, document.getElementById('root'));
registerServiceWorker();
