import React, { Component } from 'react';
import { chunk } from 'lodash';

import ProductCard from 'components/ProductCard';

class ProductGrid extends Component {
  renderRow(products) {
    const len = products.length;
    const colSize = parseInt(12 / len, 10);
    return (
      <div className="row">
        {products.map(p => (
          <div className={`col-md-${colSize}`}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    );
  }


  render() {
    const { products } = this.props;
    const chunks = chunk(products, 3);
    return (
      <div className="product-grid">
        {chunks.map(c => this.renderRow(c))}
      </div>
    );
  }
}

export default ProductGrid;
