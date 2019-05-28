const initialState = {
  city: `No cities`,
  listOffers: [],
};

const getListOffers = (listAllOffers, city) =>
  listAllOffers.filter((offer) => offer.city === city);

const ActionCreator = {
  changeCity: (newCity) => ({
    type: `CHANGE_CITY`,
    payload: newCity,
  }),

  addListOffers: (list) => ({
    type: `ADD_LIST_OFFERS`,
    payload: list,
  }),
};

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        city: action.payload,
      });

    case `ADD_LIST_OFFERS`:
      return Object.assign({}, state, {
        listOffers: action.payload,
      });
  }
  return state;
};

export {
  ActionCreator,
  getListOffers,
  reducer,
};

