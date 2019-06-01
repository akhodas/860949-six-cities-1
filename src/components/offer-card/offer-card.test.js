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
            previewImage: `path`,
            isPremium: true,
            price: 0,
            title: `title`,
            type: `type`,
            rating: 0,
            city: {
              name: `Minsk`,
              location: {
                latitude: 0,
                longitude: 0,
                zoom: 5,
              },
            },
          }
        }
        onClickTitleCard={jest.fn()}
        onClickImageCard={jest.fn()}
        onHoverCard={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
