import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

class ListingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Loading...',
      name: 'Loading...',
      price: 'Loading...',
      ipfsHash: null,
      lister: null,
      unitsAvailable: null,
      description: 'Loading...',
    };
  }

  async componentDidMount() {
    const { o2oprotocol } = this.context;
    try {
      const listing = await o2oprotocol.listings.getByIndex(
        this.props.listingId,
      );
      this.setState(listing);
      const { onSearchListing } = this.props;
      if (onSearchListing) onSearchListing(listing);
    } catch (error) {
      console.error(
        `Error fetching contract or IPFS info for listingId: ${
          this.props.listingId
        } > `,
        error,
      );
    }
  }

  render() {
    let descs = [];
    const description = this.state.description;
    if (description) {
      descs = this.state.description.split(/[\r\n]+/g);
    }
    return (
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card card-blog">
          <Link
            to={`/listing/${this.props.listingId}`}
            className="header card-image"
          >
            <div className="img-wrapper">
              <img
                src={
                  this.state.pictures &&
                  this.state.pictures.length > 0 &&
                  new URL(this.state.pictures[0]).protocol === 'data:'
                    ? this.state.pictures[0]
                    : '/images/default-image.jpg'
                }
                className="image-header"
                alt={this.state.name}
              />
            </div>
          </Link>
          <div className="content">
            <div className="circle-black">
              <div className="circle">
                <div className="date-wrapper">
                  <span className="month">
                    {Number(this.state.price).toLocaleString(undefined, {
                      minimumFractionDigits: 3,
                    })}
                  </span>
                  <span className="date">ETH</span>
                </div>
              </div>
            </div>
            <Link
              to={`/listing/${this.props.listingId}`}
              className="card-title"
            >
              <h3>{this.state.name}</h3>
            </Link>
            <h6 className="card-category text-warning">
              {this.state.category}
            </h6>
            <div className="text-description text-gray">
              <ul className="list-group">
                {descs.map(d => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </div>
          {this.state.unitsAvailable === 0 && (
            <div className="ribbon-wrapper-sold">
              <div className="ribbon-sold">SOLD</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ListingCard.contextTypes = {
  o2oprotocol: PropTypes.object,
};

export default ListingCard;
