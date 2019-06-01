import React from 'react';
import renderer from 'react-test-renderer';

import ListOffers from './list-offers.jsx';

describe(`ListOffers`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
        .create(<ListOffers
          offers={[
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
            }]
          }
          onClickTitleCard = {jest.fn()}
          onClickImageCard = {jest.fn()}
          onItemActivate = {jest.fn()}
        />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
