import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {O2OProtocol} from 'o2oprotocol';

class O2OProtocolProvider extends Component {
  constructor(props) {
    super(props);

    const {web3} = window;
    const ipfsConfig = {
      ipfsDomain: '172.16.20.121',
      ipfsApiPort: '5001',
      ipfsGatewayPort: '8080',
      ipfsProtocol: 'http'
    };
    this.initO2O({web3, ipfsConfig});
  }

  initO2O(options) {
    this.blockchain = new O2OProtocol(options);
    console.log('o2oprotocol was initialized!');
  }

  getChildContext() {
    console.log('Hello >>> getChildContext >> ', this.blockchain)
    return {blockchain: this.blockchain};
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
  blockchain: PropTypes.object
};

export default O2OProtocolProvider;
