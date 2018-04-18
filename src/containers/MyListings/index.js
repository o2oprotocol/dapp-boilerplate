import React, {Component} from 'react';
import {withRouter} from 'react-router';
import Pagination from 'react-js-pagination';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Section from 'components/Section';
import SectionSeparator from 'components/Section/SectionSeparator';

class MyListings extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="my-listings">
        <Header classes={['section-header-small', 'section-30-vh']} bgColor="black">
          <h1>My Listings</h1>
          <h3 className="subtitle">&nbsp;</h3>
          <SectionSeparator/>
        </Header>
        <Section title="There is no item here" separator={true}></Section>
      </div>
    );
  }
}

MyListings.contextTypes = {
  o2oprotocol: PropTypes.object
};

export default withRouter(MyListings);
