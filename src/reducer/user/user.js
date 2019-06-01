const initialState = {
  city: `No cities`,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  }),
};

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload,
      });
  }
  return state;
};

export {
  ActionCreator,
  ActionType,
  reducer,
};
