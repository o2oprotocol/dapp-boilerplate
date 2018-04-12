import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Section from 'components/Section';
import ProductGrid from 'components/ProductGrid';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    };
  }

  render() {
    return (
      <div className="home">
        <Section title={"Our Services"} separator={true}>
          <ProductGrid products={this.state.products} />
        </Section>
      </div>
    );
  }
}

export default withRouter(HomePage);
