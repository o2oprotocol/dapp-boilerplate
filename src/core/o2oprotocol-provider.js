import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {O2OProtocol} from 'o2oprotocol';

class O2OProtocolProvider extends Component {
  constructor(props) {
    super(props);

    const {web3} = window;
    const ipfsConfig = {
      ipfsDomain: '52.198.14.106',
      ipfsApiPort: '5001',
      ipfsGatewayPort: '8088',
      ipfsProtocol: 'http'
    };
    this.initO2O({web3, ipfsConfig});
  }

  initO2O(options) {
    this.o2oprotocol = new O2OProtocol(options);
    console.log('o2oprotocol was initialized!');
  }

  getChildContext() {
    return {o2oprotocol: this.o2oprotocol};
  }

  render() {
    return (
      <div className="o2oprotocol">
        {this.props.children}
      </div>
    );
  }
}

O2OProtocolProvider.childContextTypes = {
  o2oprotocol: PropTypes.object
};

export default O2OProtocolProvider;
