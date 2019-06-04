import React from 'react';
import renderer from 'react-test-renderer';

import Favorites from './favorites.jsx';


describe(`Favorites`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
        .create(
            <Favorites
              emailUser={`email@email.ru`}
            />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
