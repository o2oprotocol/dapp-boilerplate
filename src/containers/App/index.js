import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Layout from 'components/Layout';
import Web3Provider from 'core/web3-provider';
import HomePage from 'containers/HomePage';
import ListingDetail from 'containers/ListingDetail';
import ListingCreate from 'containers/ListingCreate';
import MyPurchase from 'containers/MyPurchase';
import Profile from 'components/Profile';
import Notifications from 'components/Notifications';
import TransactionDetail from 'components/TransactionDetail';

import './index.css';

// {/* <Route path="/page/:activePage" component={HomePage} /> <Route
// path="/listing/:listingId" component={ListingDetailPage} /> <Route
// path="/create" component={CreateListingPage} /> <Route
// path="/my-listings/:listingId" component={MyListingsTransactionPage} />
// <Route path="/my-listings" component={MyListingsPage} /> <Route
// path="/my-purchases/:listingId" component={MyPurchasesTransactionPage} />
// <Route path="/my-purchases" component={MyPurchasesPage} /> <Route
// path="/notifications" component={NotificationsPage} /> <Route path="/profile"
// component={ProfilePage} /> */ }

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
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/page/:activePage" component={HomePage}/>
              <Route path="/listing/:listingId" component={ListingDetailPage}/>
              <Route path="/create" component={CreateListingPage}/>
              <Route path="/profile" component={ProfilePage}/>
              <Route path="/notifications" component={NotificationsPage}/>
              <Route path="/my-purchases/:listingId" component={TransactionDetailPage}/>
              <Route path="/my-purchases" component={MyPurchasePage}/>
            </Switch>
          </Web3Provider>
        </Layout>
      </Router>
    );
  }
}

export default App;
