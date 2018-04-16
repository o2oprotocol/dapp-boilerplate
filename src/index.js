import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

// Import Typehead component for autocomplete input.
import 'react-bootstrap-typeahead/css/Typeahead.css';

ReactDOM.render(
  <App />, document.getElementById('root'));
registerServiceWorker();
