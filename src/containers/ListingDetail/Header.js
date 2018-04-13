import React, {Component} from 'react';
import HeaderBackground from 'assets/images/header-1.jpeg';
import ImgBackground from 'components/Header/ImgBackground';

class Header extends Component {
  render() {
    return (
      <div className="section section-header-blog">
        <div className="parallax filter filter-color-black">
          <ImgBackground src={HeaderBackground}/>
          <div className="container">
            <div className="content">
              <h1>Successful Designers Share Their Routines</h1>
              <h3 className="subtitle">Find only the best stories from our famous writers.</h3>
              <div className="separator separator-danger">✻</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
