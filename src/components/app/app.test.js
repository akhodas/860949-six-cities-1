import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

it(`App correctly renders`, () => {
  const tree = renderer
    .create(<App
      placeCardNames = {[`Place #1`, `Place #2`, `Place #3`, `Place #4`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
