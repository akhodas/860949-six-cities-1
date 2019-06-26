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
  listComments: [],
  listOffers: [],
  listFavoriteOffers: [],
  typeSort: TypeSort.POPULAR,
};

const ActionType = {
  ADD_LIST_OFFERS: `ADD_LIST_OFFERS`,
  CHANGE_FAVORITES_STATUS: `CHANGE_FAVORITES_STATUS`,
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_FAVORITE_OFFERS: `LOAD_FAVORITE_OFFERS`,
  SEND_COMMENT: `SEND_COMMENT`,
  SET_IS_LOAD: `SET_IS_LOAD`,
  SET_TYPE_SORT: `SET_TYPE_SORT`,
};

const ActionCreator = {
  addListOffers: (list) => ({
    type: ActionType.ADD_LIST_OFFERS,
    payload: list,
  }),

  changeFavoritesStatus: (offer) => ({
    type: ActionType.CHANGE_FAVORITES_STATUS,
    payload: offer,
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


  loadFavoriteOffers: (offers) => {
    return {
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: offers,
    };
  },
};

const Operation = {
  changeFavoritesStatus: (hotelId, status, history) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${hotelId}/${status}`)
      .then((response) => {
        console.log(`1`);
        if (response.status >= 200 && response.status < 300 || response.status === 403) {
          return response;
        } else {
          throw new Error(`Ошибка отправки данных избранных предложение. Повторите позже!`);
        }
      })
      .then((response) => {
        if (response.status === 403) {
          history.push(`/login`);
        } else {
          dispatch(ActionCreator.changeFavoritesStatus(ModelOffer.parseOffer(response.data)));
        }
      })
      .catch(alert);
  },

  loadComments: (hotelId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        console.log(`2`);
        if (response.status >= 200
          && response.status < 300
          || response.status === 403
          || response.status === 400) {
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
        console.log(`3`);
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

  loadFavoriteOffers: () => (dispatch, _getState, api) => {
    dispatch(ActionCreator.setIsLoad(false));
    return api.get(`/favorite`)
      .then((response) => {
        console.log(`4`);
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw new Error(`Ошибка загрузки данных отелей*. Повторите позже!`);
        }
      })
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteOffers(ModelOffer.parseOffers(response.data)));
        dispatch(ActionCreator.setIsLoad(true));
      })
      .catch(alert);
  },

  sendComment: (data, id) => (dispatch, _getState, api) => {
    console.log(`5`);
    return api.post(`/comments/${id}`, data)
        .then((response) => {
          if (response.status === 403) {
            return response;
          } else {
            dispatch(ActionCreator.loadComments(ModelComment.parseOffers(response.data)));
            return response;
          }
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

    case ActionType.CHANGE_FAVORITES_STATUS:
      const offer = state.listOffers.find((item) => item.id === action.payload.id);
      if (offer) {
        offer.isFavorite = action.payload.isFavorite;
      }
      const offerFavorite = state.listFavoriteOffers.find((item) => item.id === action.payload.id);
      if (offerFavorite) {
        offerFavorite.isFavorite = action.payload.isFavorite;
      }
      return Object.assign({}, state, {});

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

    case ActionType.LOAD_FAVORITE_OFFERS:
      return Object.assign({}, state, {
        listFavoriteOffers: action.payload,
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

