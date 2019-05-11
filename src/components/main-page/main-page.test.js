import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

describe(`MainPage`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
    .create(<MainPage
      placeNames = {[`Place #1`, `Place #2`, `Place #3`, `Place #4`]}
      clickOnTitleCard = {jest.fn()}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
