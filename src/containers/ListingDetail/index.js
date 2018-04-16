import React, {Component} from 'react';

import {Modal} from 'react-bootstrap';
import alertify from 'alertifyjs';

// temporary - we should be getting an o2oprotocol instance from our app, not
// using a global singleton
import o2oprotocol from 'core/o2oprotocol';
import Header from 'components/Header';
import StaticModal from 'components/StaticModal';
import SectionSeparator from 'components/Section/SectionSeparator';

class ListingsDetail extends Component {

  constructor(props) {
    super(props)

    this.STEP = {
      VIEW: 1,
      METAMASK: 2,
      PROCESSING: 3,
      PURCHASED: 4
    }

    this.state = {
      category: "Loading...",
      name: "Loading...",
      price: "Loading...",
      address: null,
      ipfsHash: null,
      sellerAddress: null,
      unitsAvailable: null,
      pictures: [],
      step: this.STEP.VIEW
    }

    this.handleBuyClicked = this
      .handleBuyClicked
      .bind(this)
  }

  async loadListing() {
    try {
      const listing = await o2oprotocol
        .listings
        .getByIndex(this.props.listingId)
      this.setState(listing)
    } catch (error) {
      alertify.log('There was an error loading this listing.')
      console.error(`Error fetching contract or IPFS info for listingId: ${this.props.listingId}`)
    }
  }

  componentWillMount() {
    if (this.props.listingId) {
      // Load from IPFS
      this.loadListing()
    } else if (this.props.listingJson) {
      // Listing json passed in directly
      this.setState(this.props.listingJson)
    }
  }

  async handleBuyClicked() {
    const unitsToBuy = 1
    const totalPrice = (unitsToBuy * this.state.price)
    this.setState({step: this.STEP.METAMASK})
    try {
      const transactionReceipt = await o2oprotocol
        .listings
        .buy(this.state.address, unitsToBuy, totalPrice)
      console.log("Purchase request sent.")
      this.setState({step: this.STEP.PROCESSING})
      const blockNumber = await o2oprotocol
        .contractService
        .waitTransactionFinished(transactionReceipt.tx)
      console.log('>>> handleBuyClicked >>> ', blockNumber);
      this.setState({step: this.STEP.PURCHASED})
    } catch (error) {
      console.log(error)
      alertify.log("There was a problem purchasing this listing.\nSee the console for more details.")
      this.setState({step: this.STEP.VIEW})
    }
  }

  render() {
    const price = typeof this.state.price === 'string'
      ? 0
      : this.state.price
    return (
      <div className="listing-detail">
        {!this.props.listingJson && (
          <Header classes={['section-header-small']} bgColor="black">
            <h1>{this.state.name}</h1>
            <h3 className="subtitle">{this.state.category}</h3>
            <SectionSeparator/>
          </Header>
        )}
        {this.state.step === this.STEP.METAMASK && <StaticModal backdrop="static" isOpen={true}>
          <div className="image-container">
            <img src="/images/spinner-animation.svg" alt=""/>
          </div>
          Confirm transaction<br/>
          Press &ldquo;Submit&rdquo; in MetaMask window
        </StaticModal>}
        {this.state.step === this.STEP.PROCESSING && <StaticModal backdrop="static" isOpen={true}>
          <div className="image-container">
            <img src="/images/spinner-animation.svg" alt=""/>
          </div>
          Processing your purchase<br/>
          Please stand by...
        </StaticModal>}
        {this.state.step === this.STEP.PURCHASED && <StaticModal backdrop="static" isOpen={true}>
          <div className="image-container">
            <img src="/images/circular-check-button.svg" alt=""/>
          </div>
          Purchase was successful.<br/>
          <a onClick={() => window.location.reload()}>
            Reload page
          </a>
        </StaticModal>}
        {this.state.pictures && <div className="carousel">
          {this
            .state
            .pictures
            .map(pictureUrl => (
              <div className="photo" key={pictureUrl}>
                {(new URL(pictureUrl).protocol === "data:") && <img src={pictureUrl} alt=""/>}
              </div>
            ))}
        </div>}
        <div className="container listing-container">
          <div className="row">
            <div className="col-12 col-md-8 detail-info-box">
              <div className="category">{this.state.category}</div>
              <div className="title">{this.state.name}</div>
              <div className="description">{this.state.description}</div>
              <div className="category">Seller</div>
              <div className="description">{this.state.sellerAddress}</div>
              <a
                href={o2oprotocol
                .ipfsService
                .gatewayUrlForHash(this.state.ipfsHash)}
                target="_blank">
                View on IPFS
                <big>&rsaquo;</big>
              </a>
              <div className="debug">
                <li>IPFS: {this.state.ipfsHash}</li>
                <li>Seller: {this.state.sellerAddress}</li>
                <li>Units: {this.state.unitsAvailable}</li>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="buy-box">
                <div>
                  <span>Price</span>
                  <span className="price">
                    {Number(price).toLocaleString(undefined, {minimumFractionDigits: 3})}
                    ETH
                  </span>
                </div>
                {(this.state.unitsAvailable > 1) && <div>
                  <span>Units Available</span>
                  <span className="price">{this
                      .state
                      .unitsAvailable
                      .toLocaleString()}</span>
                </div>}
                <div>
                  {(this.props.listingId) && ((this.state.unitsAvailable > 0)
                    ? <button
                        className="button"
                        onClick={this.handleBuyClicked}
                        disabled={!this.props.listingId}
                        onMouseDown={e => e.preventDefault()}>
                        Buy Now
                      </button>
                    : <div className="sold-banner">
                      <img src="/images/sold-tag.svg" alt=""/>
                      Sold
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListingsDetail
