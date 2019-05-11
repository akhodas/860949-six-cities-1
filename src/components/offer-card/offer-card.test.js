import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';

describe(`OfferCard`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<OfferCard
        placeName = {`Place #1`}
        clickOnTitleCard = {jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
