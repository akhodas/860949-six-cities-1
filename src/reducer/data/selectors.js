import Namespace from "../namespace";
import {createSelector} from "reselect";
import {TypeSort} from "./data";

export const DefaultCities = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

const NAMESPACE = Namespace.DATA;
const COUNT_OFFERS_NEAR_SELECTED = 3;

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


export const getFavoriteOffers = (state) => {
  return state[NAMESPACE].listFavoriteOffers.sort(
      (a, b) => (a.city.name < b.city.name) ? -1 : 1
  );
};

export const getOffer = createSelector(
    getOffers,
    (state, currentIdOffer) => currentIdOffer,
    (offers, currentIdOffer) => {
      return offers.find((offer) => offer.id === currentIdOffer);
    }
);

export const getCities = createSelector(
    getOffers,
    (offers) => {
      const listCities = [];
      offers.forEach((offer) => {
        if (listCities.indexOf(offer.city.name) < 0 && listCities.length < 6) {
          listCities.push(offer.city.name);
        }
      });

      while (listCities.length < 6) {
        DefaultCities.forEach((city) => {
          if (listCities.indexOf(city) < 0) {
            listCities.push(city);
          }
        });
      }

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
    (state, currentIdOffer) => {
      return getOffersForCity(
          state,
          getOffer(state, currentIdOffer).city.name
      );
    },
    getOffer,
    (offers, currentOffer) => {
      return offers.sort((a, b) => {
        return _distanceBetweenOffers(a, currentOffer)
        - _distanceBetweenOffers(b, currentOffer);
      }).slice(1, COUNT_OFFERS_NEAR_SELECTED + 1);
      // The first value in the sorted array is ignored because it is a "selected offer"
    }
);
