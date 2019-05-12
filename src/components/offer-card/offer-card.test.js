import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';

describe(`OfferCard`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<OfferCard
        offer={
          {
            id: 0,
            image: `path`,
            premium: true,
            price: 0,
            title: `title`,
            type: `type`,
            rating: 0,
          }
        }
        clickOnTitleCard={jest.fn()}
        clickOnImageCard={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
