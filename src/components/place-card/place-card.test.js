import React from 'react';
import renderer from 'react-test-renderer';
import {PlaceCard} from './place-card.jsx';

it(`PlaceCard correctly renders`, () => {
  const tree = renderer
    .create(<PlaceCard
      placeName = {`Place #1`}
      clickOnTitleCard = {jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
