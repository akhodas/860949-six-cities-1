import {
  ActionCreator,
  ActionType,
  reducer,
} from './user';

describe(`Action creators work correctly`, () => {
  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.changeCity(`newCity`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `newCity`,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: `No cities`,
    });
  });

  it(`Reducer should change city by a given name`, () => {
    expect(reducer({
      city: `No cities`,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `newCity`,
    })).toEqual({
      city: `newCity`,
    });
  });
});
