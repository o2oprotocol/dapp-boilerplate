import React, { Component } from 'react';
// import Modal from 'components/Modal';
import { Modal } from 'react-bootstrap';
import alertify from 'alertifyjs';

const networkNames = {
  1: "Main",
  2: "Morden",
  3: "Ropsten",
  4: "Rinkeby",
  42: "Kovan"
};
const supportedNetworkIds = [3, 4];
const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;

const ErrorIcon = (props) => (
  <div className="image-container">
    <img src="/images/flat_cross_icon.svg" alt="" />
  </div>
);

const ErrorModal = (props) => (
  <Modal
    show={true}
  >
    <Modal.Body className='text-center'>
      <ErrorIcon />
      {props.children}
    </Modal.Body>
  </Modal>
);

const AccountUnavailable = (props) => (
  <ErrorModal>
    You are not signed in to MetaMask.<br />
  </ErrorModal>
);

// TODO (micah): potentially add a loading indicator
const Loading = (props) => (null)

const UnconnectedNetwork = (props) => (
  <ErrorModal>
    Connecting to network...
  </ErrorModal>
)

const UnsupportedNetwork = (props) => (
  <ErrorModal>
    MetaMask should be on
    <strong>Rinkeby</strong>
    Network<br />
    Currently on {props.currentNetworkName}.
  </ErrorModal>
)

const Web3Unavailable = (props) => (
  <ErrorModal>
    MetaMask extension not installed.<br />
    <a href="https://metamask.io/">Get MetaMask</a><br />
    <a href="https://o2oprotocol.com/">
      Full Instructions for O2OProtocol Services
    </a>
  </ErrorModal>
)

class Web3Provider extends Component {
  constructor(props) {
    super(props)

    this.interval = null
    this.networkInterval = null
    this.fetchAccounts = this
      .fetchAccounts
      .bind(this)
    this.fetchNetwork = this
      .fetchNetwork
      .bind(this)
    this.state = {
      accounts: [],
      accountsLoaded: false,
      networkConnected: null,
      networkId: null,
      networkError: null
    }
  }

  /**
   * Start polling accounts, & network. We poll indefinitely so that we can
   * react to the user changing accounts or networks.
   */
  componentDidMount() {
    this.fetchAccounts()
    this.fetchNetwork()
    this.initPoll()
    this.initNetworkPoll()
  }

  /**
   * Init web3/account polling, and prevent duplicate interval.
   * @return {void}
   */
  initPoll() {
    if (!this.interval) {
      this.interval = setInterval(this.fetchAccounts, ONE_SECOND)
    }
  }

  /**
   * Init network polling, and prevent duplicate intervals.
   * @return {void}
   */
  initNetworkPoll() {
    if (!this.networkInterval) {
      this.networkInterval = setInterval(this.fetchNetwork, ONE_MINUTE)
    }
  }

  /**
   * Update state regarding the availability of web3 and an ETH account.
   * @return {void}
   */
  fetchAccounts() {
    const { web3 } = window

    web3 && web3.eth && web3
      .eth
      .getAccounts((err, accounts) => {
        if (err) {
          console.log(err)

          this.setState({ accountsError: err })
        } else {
          this.handleAccounts(accounts)
        }

        if (!this.state.accountsLoaded) {
          this.setState({ accountsLoaded: true })
        }
      });
  }

  handleAccounts(accounts) {
    let next = accounts[0]
    let curr = this.state.accounts[0]
    next = next && next.toLowerCase()
    curr = curr && curr.toLowerCase()

    if (curr !== next) {
      curr && alertify.notify('MetaMask account has changed.')

      this.setState({ accountsError: null, accounts })
    }
  }

  /**
   * Get the network and update state accordingly.
   * @return {void}
   */
  fetchNetwork() {
    const { web3 } = window
    let called = false

    web3 && web3.version && web3
      .version
      .getNetwork((err, netId) => {
        called = true

        const networkId = parseInt(netId, 10)

        if (err) {
          this.setState({ networkError: err })
        } else {
          if (networkId !== this.state.networkId) {
            this.setState({ networkError: null, networkId })
          }
        }

        if (!this.state.networkConnected) {
          this.setState({ networkConnected: true })
        }
      })

    // Delay and condition the use of the network value.
    // https://github.com/MetaMask/metamask-extension/issues/1380#issuecomment-37598
    // 0 850
    if (this.state.networkConnected === null) {
      setTimeout(() => {
        !called && web3 && web3.version && (web3.version.network === 'loading' || !web3.version.network) && this.setState({ networkConnected: false })
      }, 1000)
    }
  }

  render() {
    const { web3 } = window
    const { accounts, accountsLoaded, networkConnected, networkId } = this.state
    const currentNetworkName = networkNames[networkId]
      ? networkNames[networkId]
      : networkId
    const inProductionEnv = window.location.hostname === 'demo.o2oprotocol.io'

    if (networkConnected === false) {
      return <UnconnectedNetwork />
    }

    if (!web3) {
      return <Web3Unavailable />
    }

    if (networkId && inProductionEnv && (supportedNetworkIds.indexOf(networkId) < 0)) {
      return <UnsupportedNetwork currentNetworkName={currentNetworkName} />
    }

    if (!accountsLoaded) {
      return <Loading />
    }

    if (!accounts.length) {
      return <AccountUnavailable />
    }

    return this.props.children
  }
}

export default Web3Provider;
