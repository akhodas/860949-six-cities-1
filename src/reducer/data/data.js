import ModelOffer from '../../ModalData/model-offer';
import ModelComment from '../../ModalData/model-comment';

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
        if (response.status >= 200 && response.status < 300 || response.status === 403) {
          return response;
        } else {
          throw new Error(`Error sending data of selected offer. Will try again later!`);
        }
      })
      .then((response) => {
        if (response.status === 403) {
          history.push(`/login`);
        } else {
          dispatch(ActionCreator.changeFavoritesStatus(ModelOffer.parseOffer(response.data)));
        }
      })
      .catch((err) => errorMessage(err, alert));
  },

  loadComments: (hotelId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        if (response.status >= 200
          && response.status < 300
          || response.status === 403
          || response.status === 400) {
          return response;
        } else {
          throw new Error(`Error loading these comments. Will try again later!`);
        }
      })
      .then((response) => {
        dispatch(ActionCreator.loadComments(ModelComment.parseOffers(response.data)));
      })
      .catch((err) => errorMessage(err, alert));
  },

  loadOffers: () => (dispatch, _getState, api) => {
    dispatch(ActionCreator.setIsLoad(false));
    return api.get(`/hotels`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw new Error(`Error loading hotel data. Will try again later!`);
        }
      })
      .then((response) => {
        dispatch(ActionCreator.loadOffers(ModelOffer.parseOffers(response.data)));
        dispatch(ActionCreator.setIsLoad(true));
      })
      .catch((err) => {
        errorMessage(err, alert);
        dispatch(ActionCreator.setIsLoad(true));
      });
  },

  loadFavoriteOffers: () => (dispatch, _getState, api) => {
    dispatch(ActionCreator.setIsLoad(false));
    return api.get(`/favorite`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else if (response.status === 403) {
          throw new Error(`This information is available to authorized users.
          Your session has ended. Please login!`);
        } else {
          throw new Error(`Error loading hotel data*. Will try again later!`);
        }
      })
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteOffers(ModelOffer.parseOffers(response.data)));
        dispatch(ActionCreator.setIsLoad(true));
      })
      .catch((err) => {
        errorMessage(err, alert);
        dispatch(ActionCreator.setIsLoad(true));
      });
  },

  sendComment: (data, id) => (dispatch, _getState, api) => {
    return api.post(`/comments/${id}`, data)
        .then((response) => {
          if (response.status === 403) {
            return response;
          } else {
            dispatch(ActionCreator.loadComments(ModelComment.parseOffers(response.data)));
            return response;
          }
        })
        .catch((err) => errorMessage(err, alert));
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


export const errorMessage = (message, cb) => cb(message);
