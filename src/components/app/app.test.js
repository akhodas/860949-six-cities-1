import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

describe(`App`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<App
        placeCardNames = {[`Place #1`, `Place #2`, `Place #3`, `Place #4`]}
        clickOnTitleCard = {jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
