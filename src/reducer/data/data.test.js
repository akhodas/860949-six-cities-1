import {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
} from './data';
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";


describe(`Action creators work correctly`, () => {
  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.changeCity(`newCity`)).toEqual({
      type: ActionType.CHANGE_CITY,
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
      listComments: [],
      listOffers: [],
      flagDataIsLoading: false,
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

  it(`Should make a correct API call to /hotels`, function () {
    const mockDataServer = {
      id: 0,
      city: {
        name: `Minsk`,
        location: {
          latitude: 0,
          longitude: 0,
          zoom: 5,
        },
      },
      [`preview_image`]: `path`,
      images: [`path1`, `path2`],
      title: `title`,
      [`is_favorite`]: true,
      [`is_premium`]: true,
      rating: 0,
      type: `type`,
      bedrooms: 0,
      [`max_adults`]: 0,
      price: 0,
      goods: [`goods1`, `goods2`],
      host: {
        id: 1,
        [`is_pro`]: true,
        name: `name`,
        [`avatar_url`]: `pathAvatar`
      },
      description: `description`,
      location: {
        latitude: 1,
        longitude: 1,
        zoom: 8
      }
    };
    const mockData = {
      id: 0,
      city: {
        name: `Minsk`,
        location: {
          latitude: 0,
          longitude: 0,
          zoom: 5,
        },
      },
      previewImage: `path`,
      images: [`path1`, `path2`],
      title: `title`,
      isFavorite: true,
      isPremium: true,
      rating: 0,
      type: `type`,
      bedrooms: 0,
      maxAdults: 0,
      price: 0,
      goods: [`goods1`, `goods2`],
      host: {
        id: 1,
        isPro: true,
        name: `name`,
        avatarUrl: `pathAvatar`
      },
      description: `description`,
      location: {
        latitude: 1,
        longitude: 1,
        zoom: 8
      }
    };

    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offerLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [mockDataServer]);

    return offerLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_IS_LOAD,
          payload: false,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFERS,
          payload: [mockData],
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_IS_LOAD,
          payload: true,
        });
      });
  });

  it(`Reducer should add list offers by a given list`, () => {
    expect(reducer({
      city: `No cities`,
      listOffers: [{city: `London`}],
      flagDataIsLoading: false,
    }, {
      type: `ADD_LIST_OFFERS`,
      payload: [{city: `Minsk`}],
    })).toEqual({
      city: `No cities`,
      listOffers: [{city: `Minsk`}],
      flagDataIsLoading: false,
    });

    expect(reducer({
      city: `No cities`,
      listOffers: [],
      flagDataIsLoading: false,
    }, {
      type: `ADD_LIST_OFFERS`,
      payload: [{city: `Minsk`}],
    })).toEqual({
      city: `No cities`,
      listOffers: [{city: `Minsk`}],
      flagDataIsLoading: false,
    });

  });

});
