import {createSelector} from "reselect";
import Namespace from "../namespace";

const NAMESPACE = Namespace.DATA;


export const getCity = (state) => {
  return state[NAMESPACE].city;
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
    (state, city) => city,
    (resultOne, resultTwo) => {
      return resultOne.filter((it) => it.city.name === resultTwo);
    }
);

export const getOffersNear = createSelector(
    (state, offer) => {
      return getOffersForCity(state, offer.city.name);
    },
    (state, offer) => offer,
    (resultOne, resultTwo) => {
      return resultOne.sort((a, b) => {
        return distanceBetweenOffers(a, resultTwo)
        - distanceBetweenOffers(b, resultTwo);
      }).slice(1, 4);
    }
);

function distanceBetweenOffers(offer1, offer2) {
  return Math.sqrt(
      Math.pow((offer1.location.latitude - offer2.location.latitude), 2)
    + Math.pow((offer1.location.longitude - offer2.location.longitude), 2));
}
