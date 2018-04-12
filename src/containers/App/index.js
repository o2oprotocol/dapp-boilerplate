import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Layout from 'components/Layout';
import Web3Provider from 'core/web3-provider';
import HomePage from 'containers/HomePage';
import './index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Web3Provider>
            <Switch>
              <Route exact path="/" component={HomePage}/>
            </Switch>
          </Web3Provider>
        </Layout>
      </Router>
    );
  }
}

export default App;
