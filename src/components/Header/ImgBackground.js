import React, {Component} from 'react';

class ImgBackground extends Component {
  render() {
    const bgStyle = {
      backgroundImage: `url("${this.props.src}")`
    };
    return (<div className="image" style={bgStyle}/>);
  }
}

export default ImgBackground;
