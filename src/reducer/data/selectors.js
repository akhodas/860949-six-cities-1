import {createSelector} from "reselect";
import Namespaces from "../namespaces";

const NAMESPACES = Namespaces.DATA;


export const getOffers = (state) => {
  return state[NAMESPACES].listOffers;
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
