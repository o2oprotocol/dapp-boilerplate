import dummyData from './data';
const {listings} = dummyData;

const xListings = {
  getByIndex(listingId) {
    const listing = listings.find(listing => listing._id === listingId);
    return Promise.resolve(listing);
  },

  create(data, schema) {
    listings.push(data);
    return Promise.resolve({tx: '', data});
  },

  buy() {
    return Promise.resolve({tx: ''});
  },

  allIds() {
    return Promise.resolve(listings.map(l => l._id));
  },

  findIds({query}) {
    if (!query) 
      return Promise.resolve(listings.map(l => l._id));
    const q = query.toLowerCase()
    return Promise.resolve(listings.filter(({category, title, buyer, seller, _id}) => {
      return _id === q || (category.toLowerCase().indexOf(q) > -1 || title.toLowerCase().indexOf(q) > -1 || buyer.name.toLowerCase().indexOf(q) > -1 || seller.name.toLowerCase().indexOf(q) > -1)
    })).then(listings => listings.map(l => l._id));
  },

  findListings({query}) {
    if (!query) 
      return Promise.resolve(listings);
    const q = query.toLowerCase()
    return Promise.resolve(listings.filter(({category, title, buyer, seller, _id}) => {
      return _id === q || (category.toLowerCase().indexOf(q) > -1 || title.toLowerCase().indexOf(q) > -1 || buyer.name.toLowerCase().indexOf(q) > -1 || seller.name.toLowerCase().indexOf(q) > -1)
    }));
  },

  count() {
    return listings.length;
  }
}

const contractService = {
  waitTransactionFinished() {
    return Promise.resolve('randomBlockNumber:123');
  }
}

const ipfsService = {
  gatewayUrlForHash() {
    return 'https://ipfs.io';
  }
}

export default {
  listings: xListings,
  contractService,
  ipfsService
};
