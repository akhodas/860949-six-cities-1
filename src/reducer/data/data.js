import ModelOffer from '../../model-offer';


const initialState = {
  listOffers: [],
};

const ActionType = {
  ADD_LIST_OFFERS: `ADD_LIST_OFFERS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
  addListOffers: (list) => ({
    type: ActionType.ADD_LIST_OFFERS,
    payload: list,
  }),

  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw new Error(`Ошибка загрузки данных. Повторите позже!`);
        }
      })
      .then((response) => {
        dispatch(ActionCreator.loadOffers(ModelOffer.parseOffers(response.data)));
      })
      .catch(alert);
  },
};

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case ActionType.ADD_LIST_OFFERS:
      return Object.assign({}, state, {
        listOffers: action.payload,
      });

    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        listOffers: action.payload,
      });
  }
  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};

