import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';

import MainPage from './main-page.jsx';
import {mockOffers} from '../../mocks/mockOffer.js';

describe(`MainPage`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
    .create(
        <MemoryRouter>
          <MainPage
            offers={mockOffers}
            city = {`Minsk`}
            listCities = {[`Minsk`]}
            onClickTitleCard = {jest.fn()}
            onClickImageCard = {jest.fn()}
            onCityClick = {jest.fn()}
            redirect = {jest.fn()}
            isAuthorizationStatus = {false}
            controlAuthorization = {jest.fn()}
            emailUser = {`email@email.com`}
            flagDataIsLoading = {true}
          />
        </MemoryRouter>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
