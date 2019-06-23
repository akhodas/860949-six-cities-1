import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {compose} from 'recompose';

import MainPage from './main-page.jsx';
import {mockOffers} from '../../mocks/mockOffer.js';
import reducer from '../../reducer/reducer';
import {createAPI} from '../../api';

describe(`MainPage`, () => {
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
            <MainPage
              offers={mockOffers}
              city = {`Minsk`}
              listCities = {[`Minsk`]}
              onClickTitleCard = {jest.fn()}
              onClickImageCard = {jest.fn()}
              onChangeActiveOffer = {jest.fn()}
              onCityClick = {jest.fn()}
              redirect = {jest.fn()}
              isAuthorizationStatus = {false}
              controlAuthorization = {jest.fn()}
              emailUser = {`email@email.com`}
              flagDataIsLoading = {true}
            />
          </Provider>
        </MemoryRouter>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
