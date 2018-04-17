import PropTypes from 'prop-types';
import React, {Component} from 'react';

import BgImage from 'components/BgImage';
import HeaderBackground from 'assets/images/banner.png';

class Header extends Component {
  render() {
    const bgImage = this.props.bgImage || HeaderBackground;
    const externalClasses = this.props.classes.join(' ');
    const color = this.props.bgColor;
    return (
      <div className={`section ${externalClasses}`}>
        <div className={`parallax filter filter-color-${color}`}>
          <BgImage src={bgImage}/>
          <div className="container">
            <div className="content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.array,
  bgColor: PropTypes.string
};

Header.defaultProps = {
  classes: [],
  bgColor: 'blue'
};

export default Header;
