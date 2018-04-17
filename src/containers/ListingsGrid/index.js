import React, {Component} from 'react';
import {withRouter} from 'react-router';
import Pagination from 'react-js-pagination';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';

import ListingCard from 'components/ListingCard';

class ListingsGrid extends Component {

  constructor(props) {
    super(props);

    this.state = {
      contractFound: null,
      listingIds: [],
      listingsPerPage: 12
    }
  }

  update() {
    this.handlePageChange = this
      .handlePageChange
      .bind(this)

    // Get listings to hide
    const hideListPromise = new Promise((resolve, reject) => {
      window
        .web3
        .version
        .getNetwork((err, netId) => {
          resolve(netId)
        })
    }).then((networkId) => {
      return fetch(`https://raw.githubusercontent.com/o2oprotocol/dapp-boilerplate/master/public/hide_list/hidelist_${networkId}.json`)
    }).then((response) => {
      if (response.status === 404) {
        return [] // Default: Don't hide anything
      } else {
        return response.json()
      }
    })

    const { o2oprotocol } = this.context;

    const allListingsPromise = o2oprotocol
      .listings
      .allIds()
      .then((response) => {
        this.setState({contractFound: true})
        return response
      })
      .catch((error) => {
        if (error.message.indexOf("(network/artifact mismatch)") > 0) {
          this.setState({contractFound: false})
        }
      })
      // Wait for both to finish
      Promise
      .all([hideListPromise, allListingsPromise])
      .then(([hideList, ids]) => {
        // Filter hidden listings
        const showIds = ids
          ? ids.filter((i) => hideList.indexOf(i) < 0)
          : []

        this.setState({
          listingIds: showIds.reverse()
        })
      })
      .catch((error) => {
        console.log(error)
        alertify.alert(error.message)
      })
  }

  componentDidMount() {
    this.update()
  }

  handlePageChange(pageNumber) {
    this
      .props
      .history
      .push(`/page/${pageNumber}`)
  }

  renderFilteredBy(query) {
    return query
      ? ((
        <small>
          <i>
            Filtered by '{query}'
          </i>
        </small>
      ))
      : null
  }

  render() {
    const {contractFound, listingIds, listingsPerPage} = this.state
    const activePage = this.props.match.params.activePage || 1
    // Calc listings to show for given page
    const showListingsIds = listingIds.slice(listingsPerPage * (activePage - 1), listingsPerPage * (activePage))

    return (
      <div className="listings-wrapper">
        {contractFound === false && <div className="listings-grid">
          <div className="alert alert-warning" role="alert">
            The O2OProtocol Contract was not found on this network.<br/>
            You may need to change networks, or deploy the contract.
          </div>
        </div>}
        {contractFound && <div className="listings-grid">
          {(listingIds.length > 0) && <h1>{listingIds.length}
            Listings. {this.renderFilteredBy(this.props.query)}
          </h1>}
          <div className="row">
            {showListingsIds.map(listingId => (<ListingCard listingId={listingId} key={listingId}/>))}
          </div>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={listingsPerPage}
            totalItemsCount={listingIds.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
            hideDisabled="true"/>
        </div>}
      </div>
    )
  }
}

ListingsGrid.contextTypes = {
  o2oprotocol: PropTypes.object
};

export default withRouter(ListingsGrid);
