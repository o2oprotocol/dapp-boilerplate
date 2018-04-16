import React, {Component} from 'react';

import TransactionCard from 'components/TransactionCard';
import Header from 'components/Header';
import SectionSeparator from 'components/Section/SectionSeparator';
import MOCK_DATA from 'core/data';

class MyPurchases extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: 'all'
    }
  }

  render() {
    const {filter} = this.state
    // @TODO Remove when real data loaded
    const {
      data = MOCK_DATA
    } = this.props
    const purchases = (() => {
      const arr = data.listings

      switch (filter) {
        case 'sold':
          return arr.filter(p => p.soldAt)
        case 'fulfilled':
          return arr.filter(p => p.fulfilledAt)
        case 'received':
          return arr.filter(p => p.receivedAt)
        default:
          return arr
      }
    })()

    return (
      <div className='my-listings-wrapper'>
        <Header classes={['section-header-small', 'section-30-vh']} bgColor="black">
          <h1>My Purchases</h1>
          <h3 className="subtitle"></h3>
          <SectionSeparator/>
        </Header>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-md-3'>
              <div className='filters list-group flex-row flex-md-column'>
                <a
                  className={`list-group-item list-group-item-action${filter === 'all'
                  ? ' active'
                  : ''}`}
                  onClick={() => this.setState({filter: 'all'})}>
                  All
                </a>
                <a
                  className={`list-group-item list-group-item-action${filter === 'sold'
                  ? ' active'
                  : ''}`}
                  onClick={() => this.setState({filter: 'sold'})}>
                  Purchased
                </a>
                <a
                  className={`list-group-item list-group-item-action${filter === 'fulfilled'
                  ? ' active'
                  : ''}`}
                  onClick={() => this.setState({filter: 'fulfilled'})}>
                  Order Sent
                </a>
                <a
                  className={`list-group-item list-group-item-action${filter === 'received'
                  ? ' active'
                  : ''}`}
                  onClick={() => this.setState({filter: 'received'})}>
                  Received
                </a>
              </div>
            </div>
            <div className='col-12 col-md-9'>
              <div className='my-listings-list'>
                {purchases.map(p => <TransactionCard key={`my-purchase-${p._id}`} listing={p} perspective='buyer'/>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyPurchases
