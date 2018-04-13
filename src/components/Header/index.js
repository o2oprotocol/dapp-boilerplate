import PropTypes from 'prop-types';
import React, {Component} from 'react';

import SearchBox from 'components/SearchBox';
import HeaderBackground from 'assets/images/header-1.jpeg';
import ImgBackground from './ImgBackground';

const TitleArea = (props) => (
  <div className="title-area">
    <h1 className="title-modern">DApp Boilerplate</h1>
    <h3>Probably the most value boilerplate in the world!</h3>
    <div className="separator line-separator">♦</div>
  </div>
);

class Header extends Component {
  render() {
    return (
      <div className="section section-header">
        <div className="parallax filter filter-color-red">
          <ImgBackground src={HeaderBackground}/>
          <div className="container">
            <div className="content">
              <TitleArea/>
              <SearchBox onSearchClick={this.props.onSearchClick}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onSearchClick: PropTypes.func
};

export default Header;
