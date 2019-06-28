import React from 'react';
import renderer from 'react-test-renderer';

import MainEmpty from './main-empty.jsx';

describe(`MainEmpty`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(
          <MainEmpty />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
