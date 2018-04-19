import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import SuggestedItem from './suggested-item';
import './index.css';

const PERPAGE = 50;

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      isLoading: false,
      options: [],
    };
    this.cache = {};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {}

  async makeAndHandleRequest(query, page) {
    console.log('makeAndHandleRequest > ', this.props.data);
    return Promise.resolve(this.props.data).then(listings => {
      const totalcount = listings.length;
      const options = listings.map(({ ipfsHash, name }) => ({
        id: ipfsHash,
        title: name,
      }));
      return { options, totalcount };
    });
  }

  handleClick() {
    const { query } = this.state;
    if (this.props.onSearchClick) {
      this.props.onSearchClick(query);
    }
  }

  handleInputChange([item]) {
    if (!item) return;
    const { title } = item;
    this.setState({ query: title });
  }

  handleOptionSelected(option) {
    console.log('>> handleOptionSelected > ', option);
  }

  handlePagination(e) {
    const { query } = this.state;
    const cachedQuery = this.cache[query];
    const page = cachedQuery.page + 1;

    // Don't make another request if we already have all the results.
    if (cachedQuery.options.length === cachedQuery.totalcount) {
      return;
    }

    this.setState({ isLoading: true });
    this.makeAndHandleRequest(query, page).then(resp => {
      const options = cachedQuery.options.concat(resp.options);
      this.cache[query] = {
        ...cachedQuery,
        options,
        page,
      };
      this.setState({ isLoading: false, options });
    });
  }

  handleKeyDown({ keyCode }) {
    if (keyCode === 13) {
      // RETURN | ENTER key.
      this.handleClick();
    }
  }

  handleSearch(query) {
    if (this.cache[query]) {
      this.setState({ options: this.cache[query].options });
      return;
    }

    this.setState({ isLoading: true });
    this.makeAndHandleRequest(query).then(resp => {
      this.cache[query] = {
        ...resp,
        page: 1,
      };
      this.setState({ isLoading: false, options: resp.options });
    });
  }

  render() {
    return (
      <div className="search-box">
        <div className="input-group">
          <AsyncTypeahead
            {...this.state}
            labelKey="title"
            maxResults={PERPAGE - 1}
            minLength={2}
            onChange={this.handleInputChange}
            onPaginate={this.handlePagination}
            onSearch={this.handleSearch}
            onKeyDown={this.handleKeyDown}
            paginate
            placeholder="Search Listings..."
            renderMenuItemChildren={(option, props) => (
              <SuggestedItem key={option.id} item={option} />
            )}
            useCache={false}
          />
          <span className="input-group-addon" onClick={this.handleClick}>
            <i className="fa fa-search" />
            Search
          </span>
        </div>
      </div>
    );
  }
}

SearchBox.propTypes = {
  onSearchClick: PropTypes.func,
};

export default SearchBox;
