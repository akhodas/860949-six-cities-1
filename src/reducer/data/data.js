import ModelOffer from '../../model-offer';


const initialState = {
  listOffers: [],
};

const ActionType = {
  ADD_LIST_OFFERS: `ADD_LIST_OFFERS`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
};

const ActionCreator = {
  addListOffers: (list) => ({
    type: ActionType.ADD_LIST_OFFERS,
    payload: list,
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
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw new Error(`Ошибка загрузки данных. Повторите позже!`);
        }
      })
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(ModelOffer.parseOffers(response.data)));
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

