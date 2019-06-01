import {createSelector} from "reselect";
import Namespaces from "../namespaces";

const NAMESPACES = Namespaces.DATA;


export const getOffers = (state) => {
  return state[NAMESPACES].listOffers;
};

// export const getOffersForCity = createSelector(
//     getOffers,
//     (offers) => offers.filter((offer) => offer.city.name === `Berlin`)
// );


// const randomFilter = (_state) => {
//   return Math.random() > 0.5;
// };

// export const getRandomArtistQuestions = createSelector(
//     getOffers,
//     randomFilter,
//     (resultOne, resultTwo) => {
//       return resultOne.filter((it) => resultTwo && it.type === `Berlin`);
//     }
// );
