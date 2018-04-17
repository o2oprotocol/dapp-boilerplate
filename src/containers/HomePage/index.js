import React, {Component} from 'react';
import {withRouter} from 'react-router';
import QueryString from 'query-string';

import Listings from 'containers/ListingsGrid';
import Section from 'components/Section';
import Header from 'components/Header';
import SearchBox from 'components/SearchBox';
import HeaderBackground from 'assets/images/banner.png';

/** 
const TitleArea = (props) => (
  <div className="title-area">
    <h1 className="title-modern">Blockchain DApp</h1>
    <h3>Probably the most value boilerplate in the world!</h3>
    <div className="separator line-separator">♦</div>
  </div>
);
*/

/** 
const HomePageHeader = (props) => (
  <Header bgImage={HeaderBackground} classes={["section-header"]}>
    <TitleArea/>
    <SearchBox onSearchClick={props.onSearchClick}/>
  </Header>
);
*/

const HomePageHeader = (props) => (
  <Header bgImage={HeaderBackground} classes={["section-header"]}>
    <SearchBox onSearchClick={props.onSearchClick}/>
  </Header>
);

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
        {!q && <HomePageHeader onSearchClick={this.handleSearchClick}/>}
        <Section title={"Listings"} separator={true}>
          <Listings query={q}/>
        </Section>
      </div>
    );
  }
}

export default withRouter(HomePage);
