import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';
import Select from 'react-select';
// import alertify from 'alertifyjs';

import ListingCard from 'components/ListingCard';

import './index.css';

class ListingsGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractFound: null,
      listingIds: [],
      listingsPerPage: 12,
      listings: {},
      categories: {},
      selectedOption: '',
    };
  }

  update(options) {
    this.handlePageChange = this.handlePageChange.bind(this);

    // Get listings to hide
    // const hideListPromise = new Promise((resolve, reject) => {
    //   window.web3.version.getNetwork((err, netId) => {
    //     resolve(netId);
    //   });
    // })
    //   .then(networkId => {
    //     return fetch(
    //       `https://raw.githubusercontent.com/o2oprotocol/dapp-boilerplate/master/public/hide_list/hidelist_${networkId}.json`,
    //     );
    //   })
    //   .then(response => {
    //     if (response.status === 404) {
    //       return []; // Default: Don't hide anything
    //     } else {
    //       return response.json();
    //     }
    //   });

    const { o2oprotocol } = this.context;

    let allListingsPromise = Promise.resolve();
    if (!options || !options.category) {
      allListingsPromise = o2oprotocol.listings
        .allIds()
        .then(response => {
          this.setState({ contractFound: true });
          this.props.onSearch(response);
          return response || [];
        })
        .catch(error => {
          if (error.message.indexOf('(network/artifact mismatch)') > 0) {
            this.setState({ contractFound: false });
          }
        });
    } else {
      const { category } = options;
      allListingsPromise = Promise.resolve()
        .then(() => {
          const listings = Object.values(this.state.listings);
          return listings
            .filter(l => (category ? l.category === category.value : true))
            .map(({ index }) => index);
        })
        .then(listings => {
          this.props.onSearch(listings);
          return listings || [];
        });
    }

    allListingsPromise.then(listingIds => {
      this.setState({ listingIds });
    });

    // Wait for both to finish
    // Promise.all([hideListPromise, allListingsPromise])
    //   .then(([hideList, ids]) => {
    //     // Filter hidden listings
    //     const showIds = ids ? ids.filter(i => hideList.indexOf(i) < 0) : [];

    //     this.setState({
    //       listingIds: showIds.reverse(),
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     alertify.alert(error.message);
    //   });
  }

  componentDidMount() {
    this.update();
  }

  handleOnSearchListing(listing) {
    const { ipfsHash, category } = listing;
    if (!ipfsHash || !category) return;
    const { listings } = this.state;
    const { categories } = this.state;
    listings[ipfsHash] = listing;
    categories[category] = category;
    this.setState({ listings, categories });
    this.props.onUpdate(listings);
  }

  handleCategoryChange = selectedOption => {
    this.setState({ selectedOption });
    this.update({ category: selectedOption });
  };

  handlePageChange(pageNumber) {
    this.props.history.push(`/page/${pageNumber}`);
  }

  render() {
    const { contractFound, listingIds, listingsPerPage } = this.state;
    const activePage = this.props.match.params.activePage || 1;
    // Calc listings to show for given page
    const showListingsIds = (listingIds || []).slice(
      listingsPerPage * (activePage - 1),
      listingsPerPage * activePage,
    );

    return (
      <div className="listings-wrapper col-md-12">
        {contractFound === false && (
          <div className="listings-grid">
            <div className="alert alert-warning" role="alert">
              The O2OProtocol Contract was not found on this network.<br />
              You may need to change networks, or deploy the contract.
            </div>
          </div>
        )}
        {contractFound && (
          <div className="listings-grid">
            <div className="row">
              {showListingsIds.map(listingId => (
                <ListingCard
                  listingId={listingId}
                  key={listingId}
                  onSearchListing={this.handleOnSearchListing.bind(this)}
                />
              ))}
            </div>
            {this.state.listingIds.length > 0 && (
              <div className="row">
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={listingsPerPage}
                    totalItemsCount={listingIds.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                    hideDisabled="true"
                  />
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12 col-md-offset-4">
                  <div className="content pull-right col-md-12 col-sm-12 col-xs-12">
                    <Select
                      name="category-select"
                      value={this.state.selectedOption}
                      options={Object.keys(this.state.categories).map(c => ({
                        value: c,
                        label: c,
                      }))}
                      onChange={this.handleCategoryChange.bind(this)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

ListingsGrid.contextTypes = {
  o2oprotocol: PropTypes.object,
};

export default withRouter(ListingsGrid);
