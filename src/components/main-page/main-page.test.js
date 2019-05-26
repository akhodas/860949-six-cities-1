import React from 'react';
import renderer from 'react-test-renderer';

import MainPage from './main-page.jsx';
import mockLeaflet from '../../mocks/mock-leaflet';

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
          coordinates: [0, 0],
        }]
      }
      onClickTitleCard={jest.fn()}
      onClickImageCard={jest.fn()}
      leaflet={mockLeaflet}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
