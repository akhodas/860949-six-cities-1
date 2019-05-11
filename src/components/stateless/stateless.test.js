import React from 'react';
import renderer from 'react-test-renderer';
import Stateless from './stateless.jsx';

describe(`Stateless`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
    .create(<Stateless
      placeNames = {[`Place #1`, `Place #2`, `Place #3`, `Place #4`]}
      clickOnTitleCard = {jest.fn()}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
