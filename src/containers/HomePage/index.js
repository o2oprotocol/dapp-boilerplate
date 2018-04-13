import React, {Component} from 'react';
import {withRouter} from 'react-router';
import QueryString from 'query-string';

import Listings from 'containers/ListingsGrid';
import Section from 'components/Section';
import Header from 'components/Header';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.handleSearchClick = this
      .handleSearchClick
      .bind(this);
  }

  handleSearchClick(query) {
    window.location.href = `/?q=${query}`
  }

  render() {
    const {q} = QueryString.parse(this.props.location.search)
    return (
      <div className="home">
        {!q && <Header onSearchClick={this.handleSearchClick}/>}
        <Section title={"Listings"} separator={true}>
          <Listings query={q}/>
        </Section>
      </div>
    );
  }
}

export default withRouter(HomePage);
