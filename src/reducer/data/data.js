import ModelOffer from '../../ModalData/model-offer';
import ModelComment from '../../ModalData/modal-comment';

export const TypeSort = {
  POPULAR: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  TOP_RATER_FIRST: `Top rated first`,
};

const initialState = {
  city: `No cities`,
  flagDataIsLoading: false,
  statusSendComment: false,
  listComments: [],
  listOffers: [],
  typeSort: TypeSort.POPULAR,
};

const ActionType = {
  ADD_LIST_OFFERS: `ADD_LIST_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  SEND_COMMENT: `SEND_COMMENT`,
  SET_IS_LOAD: `SET_IS_LOAD`,
  SET_TYPE_SORT: `SET_TYPE_SORT`,
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


  setIsLoad: (flag) => ({
    type: ActionType.SET_IS_LOAD,
    payload: flag,
  }),


  setTypeSort: (option) => ({
    type: ActionType.SET_TYPE_SORT,
    payload: option,
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
    dispatch(ActionCreator.setIsLoad(false));
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
        dispatch(ActionCreator.setIsLoad(true));
      })
      .catch(alert);
  },
  sendComment: (data, id) => (dispatch, _getState, api) => {
    return api.post(`/comments/${id}`, data)
        .then((response) => {
          dispatch(ActionCreator.loadComments(ModelComment.parseOffers(response.data)));
          return true;
        })
        .catch((err) => {
          throw err;
        });
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

    case ActionType.SET_IS_LOAD:
      return Object.assign({}, state, {
        flagDataIsLoading: action.payload,
      });

    case ActionType.SET_TYPE_SORT:
      return Object.assign({}, state, {
        typeSort: action.payload,
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

