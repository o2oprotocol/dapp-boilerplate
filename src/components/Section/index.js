import React, {Component} from 'react';
import SectionSeparator from './SectionSeparator';

import './index.css';

class Section extends Component {
  render() {
    return (
      <div className="section pad-t-20">
        <div className="container">
          {this.props.title && (
            <div className="row">
              <div className="title-area">
                <h2>{this.props.title}</h2>
                {this.props.separator && <SectionSeparator/>}
                {this.props.description && <p className="description">{this.props.description}</p>}
              </div>
            </div>
          )}
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Section;
