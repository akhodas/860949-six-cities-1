import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {
  ActionType,
  Operation,
  reducer,
} from './user';


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
    const logIn = Operation.logIn();

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return logIn(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOG_IN,
          payload: [{fake: true}],
        });
      });
  });

});
