import PropTypes from 'prop-types';
import o2oprotocol from 'core/o2oprotocol';
import React, {Component} from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import SuggestedItem from './suggested-item';
import './index.css';

const PERPAGE = 50;

const makeAndHandleRequest = ({query}) => {
  return o2oprotocol
    .listings
    .findListings({query})
    .then((listings) => {
      const totalcount = o2oprotocol
        .listings
        .count()
      const options = listings.map(({_id, category}) => ({id: _id, title: category}));
      return {options, totalcount}
    })
}

class SearchBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      isLoading: false,
      options: []
    };
    this.cache = {};

    this.handleInputChange = this
      .handleInputChange
      .bind(this);
    this.handlePagination = this
      .handlePagination
      .bind(this);
    this.handleSearch = this
      .handleSearch
      .bind(this);
    this.handleKeyDown = this
      .handleKeyDown
      .bind(this);
    this.handleClick = this
      .handleClick
      .bind(this);
  }

  componentWillMount() {}

  handleClick() {
    const {query} = this.state;
    if (this.props.onSearchClick) {
      this
        .props
        .onSearchClick(query)
    }
  }

  handleInputChange(query) {
    this.setState({query});
  }

  handlePagination(e) {
    const {query} = this.state;
    const cachedQuery = this.cache[query];
    const page = cachedQuery.page + 1;

    // Don't make another request if we already have all the results.
    if (cachedQuery.options.length === cachedQuery.totalcount) {
      return;
    }

    this.setState({isLoading: true});
    makeAndHandleRequest(query, page).then((resp) => {
      const options = cachedQuery
        .options
        .concat(resp.options);
      this.cache[query] = {
        ...cachedQuery,
        options,
        page
      };
      this.setState({isLoading: false, options});
    });
  }

  handleKeyDown({keyCode}) {
    if (keyCode === 13) { // RETURN | ENTER key.
      this.handleClick();
    }
  }

  handleSearch(query) {
    if (this.cache[query]) {
      this.setState({options: this.cache[query].options});
      return;
    }

    this.setState({isLoading: true});
    makeAndHandleRequest(query).then((resp) => {
      this.cache[query] = {
        ...resp,
        page: 1
      };
      this.setState({isLoading: false, options: resp.options});
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
            onInputChange={this.handleInputChange}
            onPaginate={this.handlePagination}
            onSearch={this.handleSearch}
            onKeyDown={this.handleKeyDown}
            paginate
            placeholder="Search Listings..."
            renderMenuItemChildren={(option, props) => (<SuggestedItem key={option.id} item={option}/>)}
            useCache={false}/>
          <span className="input-group-addon" onClick={this.handleClick}>
            <i className="fa fa-search"></i>
            Search
          </span>
        </div>
      </div>
    );
  }
}

SearchBox.propTypes = {
  onSearchClick: PropTypes.func
};

export default SearchBox;
