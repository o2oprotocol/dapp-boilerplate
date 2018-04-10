import React, {Component} from 'react';

import HeaderBackground from '../../assets/images/header-1.jpeg';
import ImgBackground from './ImgBackground';

const TitleArea = (props) => (
  <div className="title-area">
    <h1 className="title-modern">DApp Boilerplate</h1>
    <h3>Probably the most value boilerplate in the world!</h3>
    <div className="separator line-separator">♦</div>
  </div>
);

const SearchBox = (props) => (
  <div className="button-get-started">
    <a href="/" className="btn btn-white btn-fill btn-lg ">
      Get Started
    </a>
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
              <SearchBox/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
