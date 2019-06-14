import {createSelector} from "reselect";
import Namespace from "../namespace";

const NAMESPACE = Namespace.DATA;


export const getCity = (state) => {
  return state[NAMESPACE].city;
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

export const getRoom = createSelector(
    getOffers,
    (state, id) => id,
    (offers, id) => {
      return offers.find((offer) => offer.id === id);
    }
);

const cityFilter = (state, city) => {
  return city;
};

export const getOffersForCity = createSelector(
    getOffers,
    cityFilter,
    (resultOne, resultTwo) => {
      return resultOne.filter((it) => it.city.name === resultTwo);
    }
);
