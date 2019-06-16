import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';

import Favorites from './favorites.jsx';


describe(`Favorites`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
        .create(
            <MemoryRouter>
              <Favorites
                emailUser={`email@email.ru`}
              />
            </MemoryRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
