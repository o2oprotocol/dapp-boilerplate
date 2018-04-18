import React, {Component} from 'react';
import {withRouter} from 'react-router';
import QueryString from 'query-string';

import Listings from 'containers/ListingsGrid';
import Section from 'components/Section';
import Header from 'components/Header';
import SearchBox from 'components/SearchBox';
import HeaderBackground from 'assets/images/banner.png';


const HomePageHeader = (props) => (
  <Header bgImage={HeaderBackground} classes={["section-header"]}>
    <SearchBox onSearchClick={props.onSearchClick}/>
  </Header>
);

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      listings: []
    };
    this.handleSearchClick = this
      .handleSearchClick
      .bind(this);
  }

  handleSearchClick(query) {
    window.location.href = `/?q=${query}`
  }

  handleOnSearch(listings) {
    this.setState({ listings: listings });
  }

  render() {
    const {q} = QueryString.parse(this.props.location.search)
    return (
      <div className="home">
        {!q && <HomePageHeader onSearchClick={this.handleSearchClick}/>}
        <Section title={`${this.state.listings.length} Listings`} separator={true}>
          <Listings query={q} onSearch={this.handleOnSearch.bind(this)}/>
        </Section>
      </div>
    );
  }
}

export default withRouter(HomePage);
