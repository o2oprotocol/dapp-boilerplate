import React, {Component} from 'react';

class BgImage extends Component {
  render() {
    const bgStyle = {
      backgroundImage: `url("${this.props.src}")`
    };
    return (<div className="image" style={bgStyle}/>);
  }
}

export default BgImage;
