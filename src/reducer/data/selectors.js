import {createSelector} from "reselect";
import Namespace from "../namespace";
import {TypeSort} from "./data";


const NAMESPACE = Namespace.DATA;

const _distanceBetweenOffers = (offer1, offer2) => {
  return Math.sqrt(
      Math.pow((offer1.location.latitude - offer2.location.latitude), 2)
    + Math.pow((offer1.location.longitude - offer2.location.longitude), 2));
};

const _sort = (arr, typeSort) => {
  switch (typeSort) {
    case TypeSort.LOW_TO_HIGH:
      return arr.sort((a, b) => a.price - b.price);
    case TypeSort.HIGH_TO_LOW:
      return arr.sort((a, b) => b.price - a.price);
    case TypeSort.TOP_RATER_FIRST:
      return arr.sort((a, b) => b.rating - a.rating);
    default:
      return arr;
  }
};

export const getCity = (state) => {
  return state[NAMESPACE].city;
};


export const getTypeSort = (state) => {
  return state[NAMESPACE].typeSort;
};


export const getFlagDataIsLoading = (state) => {
  return state[NAMESPACE].flagDataIsLoading;
};


export const getComments = (state) => {
  return state[NAMESPACE].listComments.sort(
      (a, b) => (b.date - a.date)
  );
};


export const getOffers = (state) => {
  return state[NAMESPACE].listOffers;
};


export const getCities = createSelector(
    getOffers,
    (offers) => {
      const listCities = [];
      offers.forEach((offer) => {
        if (listCities.indexOf(offer.city.name) < 0 && listCities.length < 6) {
          listCities.push(offer.city.name);
        }
      });
      return listCities;
    }
);

export const getOffersForCity = createSelector(
    getOffers,
    (state) => state,
    (state, city) => city,
    (offers, state, city) => {
      return _sort(offers.filter(
          (it) => it.city.name === city), state[NAMESPACE].typeSort
      );
    }
);

export const getOffersNear = createSelector(
    (state, offer) => {
      return getOffersForCity(state, offer.city.name);
    },
    (state, offer) => offer,
    (offers, currentOffer) => {
      return offers.sort((a, b) => {
        return _distanceBetweenOffers(a, currentOffer)
        - _distanceBetweenOffers(b, currentOffer);
      }).slice(1, 4);
    }
);
