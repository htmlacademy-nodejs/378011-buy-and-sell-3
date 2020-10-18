'use strict';
class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  searchOffers(query) {
    const filteredOffers = this._offers.filter((offer)=>offer.title.includes(query));

    return [...filteredOffers];
  }
}

module.exports = SearchService;
