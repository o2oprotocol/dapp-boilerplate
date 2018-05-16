import PropTypes from 'prop-types';
import React, {Component} from 'react';
// import {O2OProtocol} from 'o2oprotocol';
import O2OProtocol from 'o2oprotocol';

class O2OProtocolProvider extends Component {
  constructor(props) {
    super(props);

    const {web3} = window;
    const defaultIpfsDomain = process.env.REACT_APP_IPFS_SERVER_IP || "localhost"
    const defaultIpfsApiPort = process.env.REACT_APP_IPFS_API_PORT || "5001"
    const defaultIpfsGatewayPort = process.env.REACT_APP_IPFS_GATEWAY_PORT || "8081"
    const defaultIpfsGatewayProtocol = process.env.REACT_APP_IPFS_GATEWAY_PROTOCOL || "http"
    
    this.initO2O({web3, 
      ipfsDomain: defaultIpfsDomain,
      ipfsApiPort: defaultIpfsApiPort,
      ipfsGatewayPort: defaultIpfsGatewayPort,
      ipfsGatewayProtocol: defaultIpfsGatewayProtocol,
    });
  }

  initO2O(options) {
    this.o2oprotocol = new O2OProtocol(options);
    window.o2o = this.o2oprotocol
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
