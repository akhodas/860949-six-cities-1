import React from 'react';
import renderer from 'react-test-renderer';

import MainPage from './main-page.jsx';

describe(`MainPage`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
    .create(<MainPage
      offers={[
        {
          id: 0,
          image: `path`,
          premium: true,
          price: 0,
          title: `title`,
          type: `type`,
          rating: 0,
          city: `Minsk`,
          coordinates: [0, 0],
        }]
      }
      city = {`Minsk`}
      onClickTitleCard={jest.fn()}
      onClickImageCard={jest.fn()}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
