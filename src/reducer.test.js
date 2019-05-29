import {
  ActionCreator,
  reducer,
} from './reducer';

describe(`Action creators work correctly`, () => {
  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.changeCity(`newCity`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `newCity`,
    });
  });

  it(`Action creator for add list offers returns correct action`, () => {
    expect(ActionCreator.addListOffers([{city: `Minsk`}])).toEqual({
      type: `ADD_LIST_OFFERS`,
      payload: [{city: `Minsk`}],
    });
  });

});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: `No cities`,
      listOffers: [],
    });
  });

  it(`Reducer should change city by a given name`, () => {
    expect(reducer({
      city: `No cities`,
      listOffers: [],
    }, {
      type: `CHANGE_CITY`,
      payload: `newCity`,
    })).toEqual({
      city: `newCity`,
      listOffers: [],
    });
  });

  it(`Reducer should add list offers by a given list`, () => {
    expect(reducer({
      city: `No cities`,
      listOffers: [{city: `London`}],
    }, {
      type: `ADD_LIST_OFFERS`,
      payload: [{city: `Minsk`}],
    })).toEqual({
      city: `No cities`,
      listOffers: [{city: `Minsk`}],
    });

    expect(reducer({
      city: `No cities`,
      listOffers: [],
    }, {
      type: `ADD_LIST_OFFERS`,
      payload: [{city: `Minsk`}],
    })).toEqual({
      city: `No cities`,
      listOffers: [{city: `Minsk`}],
    });

  });

});

