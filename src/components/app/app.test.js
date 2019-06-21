import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';

import App from './app.jsx';
import {mockOffers} from '../../mocks/mockOffer.js';

describe(`App`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(
          <MemoryRouter>
            <App
              listOffers = {mockOffers}
              city = {`Minsk`}
              listCities = {[`Minsk`]}
              onClickTitleCard = {jest.fn()}
              onClickImageCard = {jest.fn()}
              onCityClick = {jest.fn()}
              logIn = {jest.fn()}
              emailUser = {`email@email.com`}
              isAuthorizationStatus = {false}
              controlAuthorization = {jest.fn}
              flagDataIsLoading={true}
            />
          </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
