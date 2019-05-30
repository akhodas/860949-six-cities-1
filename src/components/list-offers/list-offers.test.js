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
              image: `path`,
              premium: true,
              price: 0,
              title: `title`,
              type: `type`,
              rating: 0,
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
