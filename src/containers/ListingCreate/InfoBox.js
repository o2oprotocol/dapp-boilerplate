import React, {Component} from 'react';

class InfoBox extends Component {
  render() {
    return (
      <div className="info-box">
        <h2>{this.props.title}</h2>
        {this.props.children}
        <div className="info-box-image"><img
          className="d-none d-md-block"
          src="/images/features-graphic.svg"
          role="presentation"/></div>
      </div>
    );
  }
}

export default InfoBox;
