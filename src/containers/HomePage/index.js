import React, { Component } from 'react';
import { withRouter } from 'react-router';
import QueryString from 'query-string';

import Listings from 'containers/ListingsGrid';
import Section from 'components/Section';
import Header from 'components/Header';
import SearchBox from 'components/SearchBox';
import HeaderBackground from 'assets/images/banner.png';

const HomePageHeader = props => {
  const { data } = props;
  return (
    <Header
      bgImage={HeaderBackground}
      classes={['section-header-small']}
      bgColor="black"
    >
      <SearchBox onSearchClick={props.onSearchClick} data={data} />
    </Header>
  );
};

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      products: [],
      listings: [],
      listingsIds: [],
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleSearchClick(query) {
    this.setState({ query });
  }

  handleOnUpdate(listingsMap) {
    const listings = Object.values(listingsMap);
    this.setState({ listings: listings });
  }

  handleOnSearch(listingsIds) {
    this.setState({ listingsIds });
  }

  componentDidMount() {
    const { q } = QueryString.parse(this.props.location.search);
    this.setState({ query: q });
  }

  render() {
    return (
      <div className="home">
        <HomePageHeader
          onSearchClick={this.handleSearchClick}
          data={this.state.listings}
        />
        <Section
          title={`${this.state.listingsIds.length} Listings`}
          separator={true}
        >
          <Listings
            query={this.state.query}
            onSearch={this.handleOnSearch.bind(this)}
            onUpdate={this.handleOnUpdate.bind(this)}
          />
        </Section>
      </div>
    );
  }
}

export default withRouter(HomePage);
