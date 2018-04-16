import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SuggestedItem extends Component {
  render() {
    const {item} = this.props;
    return (
      <div>
        <span item-id={item.id}>{item.title}</span>
      </div>
    );
  }
}

SuggestedItem.propTypes = {
  item: PropTypes
    .shape({id: PropTypes.string.isRequired, title: PropTypes.string.isRequired})
    .isRequired
};

export default SuggestedItem;
