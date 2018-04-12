import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="card card-member">
        <div className="content">
          <div className="avatar avatar-danger">
            <img alt="..." className="img-circle" src="assets/img/faces/face_1.jpg" />
          </div>
          <div className="description">
            <h3 className="title">Tina</h3>
            <p className="small-text">CEO / Co-Founder</p>
            <p className="description">I miss the old Kanye I gotta say at that time I’d like to meet Kanye And I promise the power is in the people and I will use the power given by the people to bring everything I have back to the people.</p>
          </div>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes
    .shape({ id: PropTypes.string.isRequired, title: PropTypes.string.isRequired })
    .isRequired
};

export default ProductCard;
