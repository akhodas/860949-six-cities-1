import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';

import Favorites from './favorites.jsx';
import {mockOffers} from '../../mocks/mock-offer.js';


describe(`Favorites`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
        .create(
            <MemoryRouter>
              <Favorites
                emailUser={`email@email.ru`}
                favoriteOffers={[mockOffers]}
                onClickTitleCard={jest.fn()}
                onClickBookmark={jest.fn()}
              />
            </MemoryRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
