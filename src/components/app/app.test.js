import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {compose} from 'recompose';

import App from './app.jsx';
import {mockOffers} from '../../mocks/mock-offer.js';
import reducer from '../../reducer/reducer';
import {createAPI} from '../../api';


describe(`App`, () => {
  it(`correctly rendered`, () => {
    const api = createAPI((...args) => store.dispatch(...args));

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = composeEnhancers(
        applyMiddleware(thunk.withExtraArgument(api))
    );
    const store = createStore(reducer, enhancer);

    const tree = renderer
      .create(
          <MemoryRouter>
            <Provider store={store} >
              <App
                listOffers = {mockOffers}
                city = {`Minsk`}
                listCities = {[`Minsk`]}
                onClickTitleCard = {jest.fn()}
                onClickBookmark = {jest.fn()}
                onCityClick = {jest.fn()}
                logIn = {jest.fn()}
                emailUser = {`email@email.com`}
                isAuthorizationStatus = {false}
                controlAuthorization = {jest.fn}
                flagDataIsLoading={true}
              />
            </Provider>
          </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
