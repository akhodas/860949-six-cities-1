import React from 'react';
import renderer from 'react-test-renderer';

import CitiesMap from './cities-map.jsx';
import mockLeaflet from '../../mocks/mock-leaflet';

describe(`CitiesMap`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<CitiesMap
        offers={[]}
        leaflet={mockLeaflet}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
