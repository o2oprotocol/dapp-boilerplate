import moment from 'moment';

export default {
  listings : [
    {
      _id: '1foo2',
      active: false,
      category: 'Antiques',
      title: 'Title Here and Can Be Long like this',
      createdAt: moment('2018-04-04').toDate(),
      soldAt: moment('2018-04-15').toDate(),
      fulfilledAt: moment('2018-04-16').toDate(),
      receivedAt: moment('2018-04-17').toDate(),
      withdrawnAt: null,
      buyer: {
        name: 'O2O Ropsten',
        address: '0xf17f52151EbEF6C7334FAD080c5704D77216b732'
      },
      seller: {
        name: 'O2O Ropsten 2',
        address: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
      }
    }, {
      _id: '3bar4',
      active: false,
      category: 'Cars & Trucks',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      createdAt: moment('2018-04-04').toDate(),
      soldAt: moment('2018-04-15').toDate(),
      fulfilledAt: moment('2018-04-16').toDate(),
      receivedAt: null,
      withdrawnAt: null,
      buyer: {
        name: 'O2O Ropsten',
        address: '0xf17f52151EbEF6C7334FAD080c5704D77216b732'
      },
      seller: {
        name: 'O2O Ropsten 2',
        address: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
      }
    }, {
      _id: '5baz6',
      active: true,
      category: 'Tickets',
      title: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      createdAt: moment('2018-04-04').toDate(),
      soldAt: moment('2018-04-15').toDate(),
      fulfilledAt: null,
      receivedAt: null,
      withdrawnAt: null,
      buyer: {
        name: 'O2O Ropsten',
        address: '0xf17f52151EbEF6C7334FAD080c5704D77216b732'
      },
      seller: {
        name: 'O2O Ropsten 2',
        address: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
      }
    }, {
      _id: '7qux8',
      active: true,
      category: 'Dog Walking',
      title: 'Ut enim ad minim veniam',
      createdAt: moment('2018-04-04').toDate(),
      soldAt: null,
      fulfilledAt: null,
      receivedAt: null,
      withdrawnAt: null,
      buyer: {
        name: 'O2O Ropsten',
        address: '0xf17f52151EbEF6C7334FAD080c5704D77216b732'
      },
      seller: {
        name: 'O2O Ropsten 2',
        address: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
      }
    }
  ],
  notifications : [
    {
      _id: '1foo2',
      transactionType: 'purchased',
      address: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
      name: 'Account 1',
      product: 'Super Lambo',
      readAt: null,
      role: 'sell'
    }, {
      _id: '3bar4',
      transactionType: 'confirmed-receipt',
      address: '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
      name: 'Account 2',
      product: 'Wholesale Chicken',
      readAt: new Date(),
      role: 'sell'
    }, {
      _id: '5baz6',
      transactionType: 'completed',
      address: '0x56Be343B94f860124dC4fEe278FDCBD38C102D88',
      name: 'Account 3',
      product: 'Blue Suede Shoes',
      readAt: null,
      role: 'buy'
    }, {
      _id: '7qux8',
      transactionType: 'confirmed-withdrawal',
      address: '0x78Be343B94f860124dC4fEe278FDCBD38C102D88',
      readAt: new Date(),
      role: 'buy'
    }
  ]
}
