import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Layout from 'components/Layout';
import Web3Provider from 'core/web3-provider';
import O2OProtocolProvider from 'core/o2oprotocol-provider';
import HomePage from 'containers/HomePage';
import ListingDetail from 'containers/ListingDetail';
import ListingCreate from 'containers/ListingCreate';
import MyPurchase from 'containers/MyPurchase';
import MyListings from 'containers/MyListings';
import Profile from 'components/Profile';
import Notifications from 'components/Notifications';
import TransactionDetail from 'components/TransactionDetail';

import './index.css';

const ListingDetailPage = props => <ListingDetail listingId={props.match.params.listingId}/>;
const CreateListingPage = props => <ListingCreate/>;
const ProfilePage = props => <Profile {...props}/>
const NotificationsPage = props => <Notifications {...props}/>
const MyPurchasePage = props => <MyPurchase {...props}/>
const TransactionDetailPage = props => <TransactionDetail {...props} listingId={props.match.params.listingId}/>

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Web3Provider>
            <O2OProtocolProvider>
              <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/page/:activePage" component={HomePage}/>
                <Route path="/listing/:listingId" component={ListingDetailPage}/>
                <Route path="/create" component={CreateListingPage}/>
                <Route path="/profile" component={ProfilePage}/>
                <Route path="/notifications" component={NotificationsPage}/>
                <Route path="/my-purchases/:listingId" component={TransactionDetailPage}/>
                <Route path="/my-purchases" component={MyPurchasePage}/>
                <Route path="/my-listings" component={MyListings}/>
              </Switch>
            </O2OProtocolProvider>
          </Web3Provider>
        </Layout>
      </Router>
    );
  }
}

export default App;
