import React from 'react';
import renderer from 'react-test-renderer';

import OptionSort from './option-sort.jsx';
import {TypeSort} from '../../reducer/data/data.js';

describe(`OptionSort`, () => {
  it(`correctly  with open menu`, () => {
    const tree = renderer
      .create(
          <OptionSort
            showMenuSort={true}
            typeSort={TypeSort.POPULAR}
            onChange={jest.fn()}
            onSelect={jest.fn()}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`correctly  without open menu`, () => {
    const tree = renderer
      .create(
          <OptionSort
            showMenuSort={false}
            typeSort={TypeSort.POPULAR}
            onChange={jest.fn()}
            onSelect={jest.fn()}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
