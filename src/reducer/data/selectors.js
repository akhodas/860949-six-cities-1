import {createSelector} from "reselect";
import Namespace from "../namespace";

const NAMESPACE = Namespace.DATA;


export const getCity = (state) => {
  return state[NAMESPACE].city;
};


export const getIsLoadData = (state) => {
  return state[NAMESPACE].isLoadData;
};


export const getComments = (state) => {

  console.log(state);

  const comments = [
    {
      id: 1,
      user: {
        id: 1,
        isPro: true,
        name: `qwer`,
        avatarUrl: `asdf`,
      },
      rating: 1,
      comment: `zxcv`,
      date: new Date(`2019-01-08T14:13:56.569Z`),
    }, {
      id: 2,
      user: {
        id: 1,
        isPro: true,
        name: `qwer`,
        avatarUrl: `asdf`,
      },
      rating: 1,
      comment: `zxcv`,
      date: new Date(`2019-02-08T14:13:56.569Z`),
    }, {
      id: 3,
      user: {
        id: 1,
        isPro: true,
        name: `qwer`,
        avatarUrl: `asdf`,
      },
      rating: 1,
      comment: `zxcv`,
      date: new Date(`2019-03-08T14:13:56.569Z`),
    }, {
      id: 4,
      user: {
        id: 1,
        isPro: true,
        name: `qwer`,
        avatarUrl: `asdf`,
      },
      rating: 1.5,
      comment: `zxcv`,
      date: new Date(`2019-04-08T14:13:56.569Z`),
    }, {
      id: 5,
      user: {
        id: 1,
        isPro: true,
        name: `qwer`,
        avatarUrl: `asdf`,
      },
      rating: 1,
      comment: `zxcv`,
      date: new Date(`2019-05-08T14:13:56.569Z`),
    }, {
      id: 6,
      user: {
        id: 1,
        isPro: true,
        name: `qwer`,
        avatarUrl: `asdf`,
      },
      rating: 1,
      comment: `zxcv`,
      date: new Date(`2019-06-08T14:13:56.569Z`),
    }, {
      id: 7,
      user: {
        id: 1,
        isPro: true,
        name: `qwer`,
        avatarUrl: `asdf`,
      },
      rating: 3.5,
      comment: `zxcv`,
      date: new Date(`2019-07-08T14:13:56.569Z`),
    }, {
      id: 8,
      user: {
        id: 1,
        isPro: true,
        name: `qwer`,
        avatarUrl: `asdf`,
      },
      rating: 1,
      comment: `zxcv`,
      date: new Date(`2019-08-08T14:13:56.569Z`),
    }, {
      id: 9,
      user: {
        id: 1,
        isPro: true,
        name: `qwer`,
        avatarUrl: `asdf`,
      },
      rating: 4,
      comment: `zxcv`,
      date: new Date(`2019-09-08T14:13:56.569Z`),
    }, {
      id: 10,
      user: {
        id: 1,
        isPro: true,
        name: `qwer`,
        avatarUrl: `asdf`,
      },
      rating: 4.3,
      comment: `zxcv`,
      date: new Date(`2019-10-08T14:13:56.569Z`),
    }, {
      id: 11,
      user: {
        id: 1,
        isPro: true,
        name: `qwer`,
        avatarUrl: `asdf`,
      },
      rating: 4.7,
      comment: `zxcv`,
      date: new Date(`2019-11-08T14:13:56.569Z`),
    }, {
      id: 12,
      user: {
        id: 1,
        isPro: true,
        name: `qwer`,
        avatarUrl: `asdf`,
      },
      rating: 5,
      comment: `zxcv`,
      date: new Date(`2019-12-08T14:13:56.569Z`),
    },
  ];

  return comments.sort(
      (a, b) => (b.date - a.date)
  );

  // return state[NAMESPACE].listComments.sort(
  //     (a, b) => (b.date - a.date)
  // ).slice(0, 10);
};

const qwer = [];
qwer.sort((a, b) => (b.date - a.date)).slice(0, 10);
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
