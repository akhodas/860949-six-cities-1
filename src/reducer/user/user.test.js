import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {
  ActionType,
  Operation,
  reducer,
  ActionCreator,
} from './user';


describe(`Action creators work correctly`, () => {
  it(`Action creator for change status authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true,
    });
  });

  it(`Action creator for check authorization returns correct action`, () => {
    expect(ActionCreator.addUserData(true)).toEqual({
      type: ActionType.ADD_USER_DATA,
      payload: true,
    });
  });

  it(`Action creator for login returns correct action`, () => {
    expect(ActionCreator.onLogIn(true)).toEqual({
      type: ActionType.LOG_IN,
      payload: true,
    });
  });

});


describe(`Reducer works correctly with API`, () => {
  it(`Should make a correct API call to GET /login`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const getAuthorization = Operation.addUserData();

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return getAuthorization(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.ADD_USER_DATA,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to POST /login`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const onLogIn = Operation.onLogIn();

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return onLogIn(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOG_IN,
          payload: [{fake: true}],
        });
      });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthorizationRequired: true,
      id: 1,
      email: `mail@gmail.com`,
      name: `Name`,
      avatarUrl: ``,
      isPro: false
    });
  });

  it(`Reducer should change status authorization by a given`, () => {
    expect(reducer({
      isAuthorizationRequired: true,
      id: 1,
      email: `mail@gmail.com`,
      name: `Name`,
      avatarUrl: ``,
      isPro: false
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: false,
    })).toEqual({
      isAuthorizationRequired: false,
      id: 1,
      email: `mail@gmail.com`,
      name: `Name`,
      avatarUrl: ``,
      isPro: false
    });
  });

  it(`Reducer should add data user by a given data`, () => {
    expect(reducer({
      isAuthorizationRequired: true,
      id: 1,
      email: `mail@gmail.com`,
      name: `Name`,
      avatarUrl: ``,
      isPro: false
    }, {
      type: ActionType.ADD_USER_DATA,
      payload: {
        id: 2,
        email: `newMil@gmail.com`,
        name: `newName`,
        [`avatar_url`]: `img`,
        [`is_pro`]: true
      },
    })).toEqual({
      isAuthorizationRequired: false,
      id: 2,
      email: `newMil@gmail.com`,
      name: `newName`,
      avatarUrl: `img`,
      isPro: true
    });
  });

  it(`Reducer should log in by a given data`, () => {
    expect(reducer({
      isAuthorizationRequired: true,
      id: 1,
      email: `mail@gmail.com`,
      name: `Name`,
      avatarUrl: ``,
      isPro: false
    }, {
      type: ActionType.LOG_IN,
      payload: {
        id: 2,
        email: `newMil@gmail.com`,
        name: `newName`,
        [`avatar_url`]: `img`,
        [`is_pro`]: true
      },
    })).toEqual({
      isAuthorizationRequired: false,
      id: 2,
      email: `newMil@gmail.com`,
      name: `newName`,
      avatarUrl: `img`,
      isPro: true
    });
  });
});
