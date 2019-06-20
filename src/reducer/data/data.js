import ModelOffer from '../../ModalData/model-offer';
import ModelComment from '../../ModalData/modal-comment';


const initialState = {
  city: `No cities`,
  isLoadData: false,
  listComments: [],
  listOffers: [],
};

const ActionType = {
  ADD_LIST_OFFERS: `ADD_LIST_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_OCOMMENTS: `LOAD_OCOMMENTS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHECK_IS_LOAD: `CHECK_IS_LOAD`,
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


  checkIsLoad: (flag) => ({
    type: ActionType.CHECK_IS_LOAD,
    payload: flag,
  }),


  loadComments: (comments) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    };
  },


  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
};

const Operation = {
  loadComments: (hotelId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw new Error(`Ошибка загрузки данных комментариев. Повторите позже!`);
        }
      })
      .then((response) => {
        dispatch(ActionCreator.loadComments(ModelComment.parseOffers(response.data)));
      })
      .catch(alert);
  },
  loadOffers: () => (dispatch, _getState, api) => {
    dispatch(ActionCreator.checkIsLoad(false));
    return api.get(`/hotels`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw new Error(`Ошибка загрузки данных отелей. Повторите позже!`);
        }
      })
      .then((response) => {
        dispatch(ActionCreator.loadOffers(ModelOffer.parseOffers(response.data)));
        dispatch(ActionCreator.checkIsLoad(true));
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

    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload,
      });

    case ActionType.CHECK_IS_LOAD:
      return Object.assign({}, state, {
        isLoadData: action.payload,
      });

    case ActionType.LOAD_COMMENTS:
      return Object.assign({}, state, {
        listComments: action.payload,
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

