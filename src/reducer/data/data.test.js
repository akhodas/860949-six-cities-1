import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api";
import {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
  TypeSort,
} from './data';
import {mockCommentServerApi, mockCommentApi} from "../../mocks/mock-comment";
import {mockOfferServerApi, mockOfferApi} from "../../mocks/mock-offer";


describe(`Action creators work correctly`, () => {
  it(`Action creator for add list offers returns correct action`, () => {
    expect(ActionCreator.addListOffers([{id: 1}])).toEqual({
      type: ActionType.ADD_LIST_OFFERS,
      payload: [{id: 1}],
    });
  });

  it(`Action creator for change favorite status offer returns correct action`, () => {
    expect(ActionCreator.changeFavoritesStatus([{offer: `status`}])).toEqual({
      type: ActionType.CHANGE_FAVORITES_STATUS,
      payload: [{offer: `status`}],
    });
  });

  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.changeCity(`newCity`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `newCity`,
    });
  });

  it(`Action creator for change status loading returns correct action`, () => {
    expect(ActionCreator.setIsLoad(true)).toEqual({
      type: ActionType.SET_IS_LOAD,
      payload: true,
    });
  });

  it(`Action creator for change type sorting returns correct action`, () => {
    expect(ActionCreator.setTypeSort(`Popular`)).toEqual({
      type: ActionType.SET_TYPE_SORT,
      payload: `Popular`,
    });
  });

  it(`Action creator for load comments returns correct action`, () => {
    expect(ActionCreator.loadComments([{comment: `hi`}])).toEqual({
      type: ActionType.LOAD_COMMENTS,
      payload: [{comment: `hi`}],
    });
  });

  it(`Action creator for load offers returns correct action`, () => {
    expect(ActionCreator.loadOffers([{offer: `loadOffer`}])).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: [{offer: `loadOffer`}],
    });
  });

  it(`Action creator for load favorite offers returns correct action`, () => {
    expect(ActionCreator.loadFavoriteOffers([{offer: `loadFavoriteOffer`}])).toEqual({
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: [{offer: `loadFavoriteOffer`}],
    });
  });
});


describe(`Reducer works correctly with API`, () => {
  it(`Should make a correct API call to POST /comment/hotelId`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const sendComment = Operation.sendComment({
      rating: 4,
      comment: `A quiet cozy.`
    }, 1);

    apiMock
      .onPost(`/comments/1`)
      .reply(200, [mockCommentServerApi]);

    return sendComment(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: [mockCommentApi],
        });
      });
  });

  it(`Should make a correct API call to /hotels`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offerLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [mockOfferServerApi]);

    return offerLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_IS_LOAD,
          payload: false,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFERS,
          payload: [mockOfferApi],
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_IS_LOAD,
          payload: true,
        });
      });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offerLoader = Operation.loadFavoriteOffers();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [mockOfferServerApi]);

    return offerLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_IS_LOAD,
          payload: false,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_FAVORITE_OFFERS,
          payload: [mockOfferApi],
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_IS_LOAD,
          payload: true,
        });
      });
  });

  it(`Should make a correct API call to /comments`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const commentLoader = Operation.loadComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [mockCommentServerApi]);

    return commentLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: [mockCommentApi],
        });
      });
  });

});


describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: `No cities`,
      listComments: [],
      listOffers: [],
      listFavoriteOffers: [],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    });
  });

  it(`Reducer should change city by a given name`, () => {
    expect(reducer({
      city: `No cities`,
      listComments: [],
      listOffers: [],
      listFavoriteOffers: [],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `newCity`,
    })).toEqual({
      city: `newCity`,
      listComments: [],
      listOffers: [],
      listFavoriteOffers: [],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    });
  });

  it(`Reducer should add list offers by a given list`, () => {
    expect(reducer({
      city: `No cities`,
      listComments: [],
      listOffers: [{city: `London`}],
      listFavoriteOffers: [],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    }, {
      type: ActionCreator.ADD_LIST_OFFERS,
      payload: [{city: `Minsk`}],
    })).toEqual({
      city: `No cities`,
      listComments: [],
      listOffers: [{city: `London`}],
      listFavoriteOffers: [],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
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

  it(`Reducer should change status loading by a given name`, () => {
    expect(reducer({
      city: `No cities`,
      listComments: [],
      listOffers: [],
      listFavoriteOffers: [],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    }, {
      type: ActionType.SET_IS_LOAD,
      payload: true,
    })).toEqual({
      city: `No cities`,
      listComments: [],
      listOffers: [],
      listFavoriteOffers: [],
      flagDataIsLoading: true,
      typeSort: TypeSort.POPULAR,
    });
  });

  it(`Reducer should change favorite status offer by a given name`, () => {
    expect(reducer({
      city: `No cities`,
      listComments: [],
      listOffers: [{id: 1, isFavorite: true}, {id: 2, isFavorite: false}],
      listFavoriteOffers: [{id: 1, isFavorite: true}],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    }, {
      type: ActionType.CHANGE_FAVORITES_STATUS,
      payload: {id: 1, isFavorite: false},
    })).toEqual({
      city: `No cities`,
      listComments: [],
      listOffers: [{id: 1, isFavorite: false}, {id: 2, isFavorite: false}],
      listFavoriteOffers: [{id: 1, isFavorite: false}],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    });
  });

  it(`Reducer should change type sorting offer by a given name`, () => {
    expect(reducer({
      city: `No cities`,
      listComments: [],
      listOffers: [{id: 1, isFavorite: true}, {id: 2, isFavorite: false}],
      listFavoriteOffers: [{id: 1, isFavorite: true}],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    }, {
      type: ActionType.SET_TYPE_SORT,
      payload: TypeSort.LOW_TO_HIGH,
    })).toEqual({
      city: `No cities`,
      listComments: [],
      listOffers: [{id: 1, isFavorite: true}, {id: 2, isFavorite: false}],
      listFavoriteOffers: [{id: 1, isFavorite: true}],
      flagDataIsLoading: false,
      typeSort: TypeSort.LOW_TO_HIGH,
    });
  });

  it(`Reducer should for load comments by a given name`, () => {
    expect(reducer({
      city: `No cities`,
      listComments: [{comment: `number 1`}],
      listOffers: [{id: 1, isFavorite: true}, {id: 2, isFavorite: false}],
      listFavoriteOffers: [{id: 1, isFavorite: true}],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    }, {
      type: ActionType.LOAD_COMMENTS,
      payload: [{comment: `number 3`}, {comment: `number 5`}],
    })).toEqual({
      city: `No cities`,
      listComments: [{comment: `number 3`}, {comment: `number 5`}],
      listOffers: [{id: 1, isFavorite: true}, {id: 2, isFavorite: false}],
      listFavoriteOffers: [{id: 1, isFavorite: true}],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    });
  });

  it(`Reducer should for load offers by a given name`, () => {
    expect(reducer({
      city: `No cities`,
      listComments: [{comment: `number 1`}],
      listOffers: [{id: 1, isFavorite: true}, {id: 2, isFavorite: false}],
      listFavoriteOffers: [{id: 1, isFavorite: true}],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: [{id: 7, isFavorite: false}, {id: 9, isFavorite: true}],
    })).toEqual({
      city: `No cities`,
      listComments: [{comment: `number 1`}],
      listOffers: [{id: 7, isFavorite: false}, {id: 9, isFavorite: true}],
      listFavoriteOffers: [{id: 1, isFavorite: true}],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    });
  });

  it(`Reducer should for load favorite offers by a given name`, () => {
    expect(reducer({
      city: `No cities`,
      listComments: [{comment: `number 1`}],
      listOffers: [{id: 1, isFavorite: true}, {id: 2, isFavorite: false}, {id: 3, isFavorite: true}],
      listFavoriteOffers: [{id: 1, isFavorite: true}],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    }, {
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: [{id: 1, isFavorite: true}, {id: 3, isFavorite: true}],
    })).toEqual({
      city: `No cities`,
      listComments: [{comment: `number 1`}],
      listOffers: [{id: 1, isFavorite: true}, {id: 2, isFavorite: false}, {id: 3, isFavorite: true}],
      listFavoriteOffers: [{id: 1, isFavorite: true}, {id: 3, isFavorite: true}],
      flagDataIsLoading: false,
      typeSort: TypeSort.POPULAR,
    });
  });

});
