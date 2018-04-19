import React, { Component } from 'react';
import moment from 'moment';

// import TransactionCard from 'components/TransactionCard';
import Header from 'components/Header';
import SectionSeparator from 'components/Section/SectionSeparator';
import Section from 'components/Section';
import MOCK_DATA from 'core/data';

const PurchasedItem = ({ data }) => {
  const {
    _id,
    title,
    soldAt,
    fulfilledAt,
    // receivedAt,
    seller: { name },
  } = data;
  const date = soldAt ? moment(soldAt).format('YYYY-MM-DD HH:mm:ss') : '';
  const status = soldAt ? 'SOLD' : fulfilledAt ? ' FULFILED' : 'RECEIVED';
  return (
    <tr>
      <td>{_id}</td>
      <td>{date}</td>
      <td>{title}</td>
      <td>{name}</td>
      <td>{status}</td>
    </tr>
  );
};

class MyPurchases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'all',
    };
  }

  render() {
    const { filter } = this.state;
    // @TODO Remove when real data loaded
    const { data = MOCK_DATA } = this.props;
    const purchases = (() => {
      const arr = data.listings;

      switch (filter) {
        case 'sold':
          return arr.filter(p => p.soldAt);
        case 'fulfilled':
          return arr.filter(p => p.fulfilledAt);
        case 'received':
          return arr.filter(p => p.receivedAt);
        default:
          return arr;
      }
    })();

    return (
      <div className="my-listings-wrapper">
        <Header
          classes={['section-header-small', 'section-30-vh']}
          bgColor="black"
        >
          <h1>My Purchases</h1>
          <h3 className="subtitle">&nbsp;</h3>
          <SectionSeparator />
        </Header>
        <Section title={`My Purchased`} separator={true}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-3">
                <div className="filters list-group flex-row flex-md-column">
                  <a
                    className={`list-group-item list-group-item-action${
                      filter === 'all' ? ' active' : ''
                    }`}
                    onClick={() => this.setState({ filter: 'all' })}
                  >
                    All
                  </a>
                  <a
                    className={`list-group-item list-group-item-action${
                      filter === 'sold' ? ' active' : ''
                    }`}
                    onClick={() => this.setState({ filter: 'sold' })}
                  >
                    Purchased
                  </a>
                  <a
                    className={`list-group-item list-group-item-action${
                      filter === 'fulfilled' ? ' active' : ''
                    }`}
                    onClick={() => this.setState({ filter: 'fulfilled' })}
                  >
                    Order Sent
                  </a>
                  <a
                    className={`list-group-item list-group-item-action${
                      filter === 'received' ? ' active' : ''
                    }`}
                    onClick={() => this.setState({ filter: 'received' })}
                  >
                    Received
                  </a>
                </div>
              </div>
              <div className="col-12 col-md-9">
                <div className="my-listings-list">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Purchased Date</th>
                        <th>Product Name</th>
                        <th>Seller</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map(p => (
                        <PurchasedItem data={p} key={p._id} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

export default MyPurchases;
