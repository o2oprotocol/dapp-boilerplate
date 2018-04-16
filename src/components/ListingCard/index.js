import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// temporary - we should be getting an o2oprotocol instance from our app, not
// using a global singleton
// import o2oprotocol from 'core/o2oprotocol';
import './index.css';

let o2oprotocol = {};

class ListingCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: "Loading...",
      name: "Loading...",
      price: "Loading...",
      ipfsHash: null,
      lister: null,
      unitsAvailable: null
    }
  }

  async componentDidMount() {
    o2oprotocol = window.o2o;
    console.log('>>> ', o2oprotocol)
    try {
      const listing = await o2oprotocol
        .listings
        .getByIndex(this.props.listingId);
      this.setState(listing);
    } catch (error) {
      console.error(`Error fetching contract or IPFS info for listingId: ${this.props.listingId} > `, error);
    }
  }

  render() {
    return (
      <div className="col-12 col-md-6 col-lg-4 listing-card">
        <Link to={`/listing/${this.props.listingId}`}>
          <div
            className="photo"
            style={{
            backgroundImage: `url("${ (this.state.pictures && this.state.pictures.length > 0 && (new URL(this.state.pictures[0])).protocol === "data:")
              ? this.state.pictures[0]
              : '/images/default-image.jpg'}")`
          }}></div>
          <div className="category">{this.state.category}</div>
          <div className="title">{this.state.name}</div>
          <div className="price">
            {Number(this.state.price).toLocaleString(undefined, {minimumFractionDigits: 3})}
            ETH {this.state.unitsAvailable === 0 && <span className="sold-banner">Sold</span>}
          </div>
        </Link>
      </div>
    )
  }
}

export default ListingCard;
