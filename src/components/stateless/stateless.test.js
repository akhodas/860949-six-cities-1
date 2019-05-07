import React from 'react';
import renderer from 'react-test-renderer';
import {Stateless} from './stateless.jsx';

it(`Stateless correctly renders`, () => {
  const tree = renderer
    .create(<Stateless
      placeNames = {[`Place #1`, `Place #2`, `Place #3`, `Place #4`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
