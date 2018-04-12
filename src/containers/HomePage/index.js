import React, {Component} from 'react';
import {withRouter} from 'react-router';

import Section from 'components/Section';

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Section/>
      </div>
    );
  }
}

export default withRouter(HomePage);
