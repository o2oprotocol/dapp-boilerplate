import React, { Component } from 'react';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import StaticModal from 'components/StaticModal';
import SectionSeparator from 'components/Section/SectionSeparator';
import FaceImg from 'assets/images/avatar.png';
import Lightbox from 'react-image-lightbox';

import './index.css';

class ListingsDetail extends Component {
  constructor(props) {
    super(props);

    this.STEP = {
      VIEW: 1,
      METAMASK: 2,
      PROCESSING: 3,
      PURCHASED: 4,
    };

    this.state = {
      category: 'Loading...',
      name: 'Loading...',
      price: 'Loading...',
      address: null,
      ipfsHash: null,
      sellerAddress: null,
      unitsAvailable: null,
      pictures: [],
      step: this.STEP.VIEW,
      photoIndex: 0,
      isOpen: false,
    };

    this.handleBuyClicked = this.handleBuyClicked.bind(this);
  }

  async loadListing() {
    try {
      const listing = await this.o2oprotocol.listings.getByIndex(
        this.props.listingId,
      );
      this.setState(listing);
    } catch (error) {
      alertify.error('There was an error loading this listing.');
      console.error(
        `Error fetching contract or IPFS info for listingId: ${
          this.props.listingId
        }`,
      );
    }
  }

  componentWillMount() {
    this.o2oprotocol = this.context.o2oprotocol;
    if (this.props.listingId) {
      // Load from IPFS
      this.loadListing();
    } else if (this.props.listingJson) {
      // Listing json passed in directly
      this.setState(this.props.listingJson);
    }
  }

  async handleBuyClicked() {
    const unitsToBuy = 1;
    const totalPrice = unitsToBuy * this.state.price;
    this.setState({ step: this.STEP.METAMASK });
    try {
      const transactionReceipt = await this.o2oprotocol.listings.buy(
        this.state.address,
        unitsToBuy,
        totalPrice,
      );
      console.log('Purchase request sent.');
      this.setState({ step: this.STEP.PROCESSING });
      const blockNumber = await this.o2oprotocol.contractService.waitTransactionFinished(
        transactionReceipt.tx,
      );
      console.log('>>> handleBuyClicked >>> ', blockNumber);
      this.setState({ step: this.STEP.PURCHASED });
    } catch (error) {
      console.log(error);
      alertify.error(
        'There was a problem purchasing this listing.\nSee the console for more details.',
      );
      this.setState({ step: this.STEP.VIEW });
    }
  }

  handleImageClick() {
    this.setState({ isOpen: true });
  }

  renderModalIfThereIs() {
    return (
      <div>
        {!this.props.listingJson && (
          <Header classes={['section-header-small']} bgColor="black">
            <h1>{this.state.name}</h1>
            <h3 className="subtitle">{this.state.category}</h3>
            <SectionSeparator />
          </Header>
        )}
        {this.state.step === this.STEP.METAMASK && (
          <StaticModal show={true}>
            <div className="image-container">
              <img src="/images/spinner-animation.svg" alt="" />
            </div>
            Confirm transaction<br />
            Press &ldquo;Submit&rdquo; in MetaMask window
          </StaticModal>
        )}
        {this.state.step === this.STEP.PROCESSING && (
          <StaticModal show={true}>
            <div className="image-container">
              <img src="/images/spinner-animation.svg" alt="" />
            </div>
            Processing your purchase<br />
            Please stand by...
          </StaticModal>
        )}
        {this.state.step === this.STEP.PURCHASED && (
          <StaticModal show={true}>
            <div className="image-container">
              <img src="/images/circular-check-button.svg" alt="" />
            </div>
            Purchase was successful.<br />
            <a onClick={() => window.location.reload()}>Reload page</a>
          </StaticModal>
        )}
      </div>
    );
  }

  renderDetailHeader() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h2>{this.state.name}</h2>
        </div>
        <div className="col-md-9">
          <div className="category">{this.state.category}</div>
          <div className="category">
            <span>{this.state.sellerAddress}</span>
          </div>
        </div>
        <div className="col-md-2 col-md-offset-1">
          <div className="avatar avatar-danger">
            <img alt={this.state.sellerAddress} src={FaceImg} />
          </div>
        </div>
      </div>
    );
  }

  renderDetailSummary() {
    return (
      <div className="row">
        <ul className="list-group">
          <li className="summary-item">
            <i className="fa fa-map-marker-alt" />
            <span>Location: {this.state.location}</span>
          </li>
          <li className="summary-item">
            <i className="fa fa-hdd" />
            <span>IPFS:</span>
            <a
              href={this.o2oprotocol.ipfsService.gatewayUrlForHash(
                this.state.ipfsHash,
              )}
              target="_blank"
            >
              <span>{this.state.ipfsHash}</span>
            </a>
          </li>
          <li className="summary-item">
            <i className="fa fa-user" />
            <span>Seller: {this.state.sellerAddress}</span>
          </li>
          <li className="summary-item">
            <i className="fa fa-shopping-cart" />
            {this.state.unitsAvailable > 0 && (
              <span>Units: {this.state.unitsAvailable}</span>
            )}
            {this.state.unitsAvailable <= 0 && <span>SOLD</span>}
          </li>
        </ul>
      </div>
    );
  }

  renderDescription() {
    let descs = [];
    const description = this.state.description;
    if (description) {
      descs = this.state.description.split(/[\r\n]+/g);
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <ul className="list-group">{descs.map(d => <li key={d}>{d}</li>)}</ul>
        </div>
      </div>
    );
  }

  renderImagesViewer() {
    const { photoIndex, isOpen, pictures } = this.state;
    return (
      <div>
        {isOpen && (
          <Lightbox
            mainSrc={pictures[photoIndex]}
            nextSrc={pictures[(photoIndex + 1) % pictures.length]}
            prevSrc={
              pictures[(photoIndex + pictures.length - 1) % pictures.length]
            }
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex:
                  (photoIndex + pictures.length - 1) % pictures.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % pictures.length,
              })
            }
          />
        )}
      </div>
    );
  }

  renderDetail() {
    const price = typeof this.state.price === 'string' ? 0 : this.state.price;
    const { pictures } = this.state;
    const hasPicture = pictures && pictures.length > 0;
    const sold = this.state.unitsAvailable <= 0;
    const embeded = this.props.listingJson ? true : false;

    return (
      <div className={`container item-detail ${embeded ? 'col-md-12' : ''}`}>
        <div className="row pad-tb-40">
          <div className="col-md-8 col-sm-12">
            <div className="content-wrapper">
              {this.renderDetailHeader()}
              {this.renderDetailSummary()}
              {this.renderDescription()}
            </div>
          </div>
          <div className="col-md-4 col-sm-12 text-center">
            <div className="row">
              {hasPicture && (
                <div className="photo" key={pictures[0]}>
                  <div
                    className="expand"
                    onClick={this.handleImageClick.bind(this)}
                  >
                    {new URL(pictures[0]).protocol === 'data:' && (
                      <img
                        className="img-responsive"
                        src={pictures[0]}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              )}
              {hasPicture && this.renderImagesViewer()}
            </div>

            <div className="row pad-tb-10">
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <span className="price pull-left">
                        {Number(price).toLocaleString(undefined, {
                          minimumFractionDigits: 3,
                        })}
                      </span>
                      <span className="unit pull-left">ETH</span>
                    </div>
                  </div>
                  <div className="row">
                    <span className="stars">
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                    </span>
                    <span className="reviews">99 reviews</span>
                  </div>
                </div>
                <div className="col-md-5 col-md-offset-1">
                  {this.props.listingId && (
                    <button
                      className={`btn btn-fill btn-danger`}
                      onClick={this.handleBuyClicked}
                      disabled={!this.props.listingId || sold}
                      onMouseDown={e => e.preventDefault()}
                    >
                      {sold ? <span>SOLD</span> : <span>Buy Now</span>}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="listing-detail">
        {this.renderModalIfThereIs()}
        {this.renderDetail()}
      </div>
    );
  }
}

ListingsDetail.contextTypes = {
  o2oprotocol: PropTypes.object,
};

export default ListingsDetail;
