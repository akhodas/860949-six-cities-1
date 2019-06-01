import ModelOffer from './model-offer';


const initialState = {
  city: `No cities`,
  listOffers: [],
};

const ActionType = {
  ADD_LIST_OFFERS: `ADD_LIST_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
};

const ActionCreator = {
  addListOffers: (list) => ({
    type: ActionType.ADD_LIST_OFFERS,
    payload: list,
  }),

  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  }),

  loadQuestions: (offers) => {
    return {
      type: ActionType.LOAD_QUESTIONS,
      payload: offers,
    };
  },
};

const Operation = {
  loadQuestions: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
        .then((response) => {
          dispatch(ActionCreator.loadQuestions(ModelOffer.parseOffers(response.data)));
        });
  },
};

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case `ADD_LIST_OFFERS`:
      return Object.assign({}, state, {
        listOffers: action.payload,
      });

    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        city: action.payload,
      });

    case ActionType.LOAD_QUESTIONS:
      return Object.assign({}, state, {
        listOffers: action.payload,
      });
  }
  return state;
};

export {
  ActionCreator,
  Operation,
  reducer,
};

