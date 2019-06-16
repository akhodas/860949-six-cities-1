import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';

import App from './app.jsx';

describe(`App`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(
          <MemoryRouter>
            <App
              listOffers = {[
                {
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
                }]
              }
              city = {`Minsk`}
              listCities = {[`Minsk`]}
              onClickTitleCard = {jest.fn()}
              onClickImageCard = {jest.fn()}
              onCityClick = {jest.fn()}
              logIn = {jest.fn()}
              emailUser = {`email@email.com`}
              isAuthorizationStatus = {false}
              controlAuthorization = {jest.fn}
              isLoadData={true}
            />
          </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
