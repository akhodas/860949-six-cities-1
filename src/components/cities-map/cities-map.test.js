import React from 'react';
import renderer from 'react-test-renderer';

import CitiesMap from './cities-map.jsx';


describe(`CitiesMap`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<CitiesMap
        offers={[]}
        styleClassNames = {[
          `cities`,
        ]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
