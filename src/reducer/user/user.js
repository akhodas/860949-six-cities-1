const initialState = {
  city: `No cities`,
  isAuthorizationRequired: false,
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatarUrl: `img/1.png`,
  isPro: false
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  ADD_USER_DATA: `ADD_USER_DATA`,
  LOG_IN: `LOG_IN`,
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  }),

  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  addUserData: (status) => {
    return {
      type: ActionType.ADD_USER_DATA,
      payload: status,
    };
  },

  logIn: (status) => {
    return {
      type: ActionType.LOG_IN,
      payload: status,
    };
  },
};


const Operation = {
  addUserData: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
        .then((response) => dispatch(ActionCreator.addUserData(response.data)))
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log(`Ошибка авторизации. Повторите позже!`);
        });
  },
  logIn: (data) => (dispatch, _getState, api) => {
    return api.post(`/login`, data)
        .then((response) => {
          dispatch(ActionCreator.logIn(response.data));
        })
        .catch(alert);
  },

};


const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload,
      });

    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });

    case ActionType.ADD_USER_DATA:
      return Object.assign({}, state, action.payload);

    case ActionType.LOG_IN:
      return Object.assign({}, state, {
        isAuthorizationRequired: false,
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name,
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
