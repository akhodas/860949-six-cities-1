import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';

import OfferCard from './offer-card.jsx';
import {mockOffer} from '../../mocks/mock-offer.js';


describe(`OfferCard`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<MemoryRouter> <OfferCard
        offer={mockOffer}
        onClickTitleCard={jest.fn()}
        onChangeActiveOffer={jest.fn()}
        onClickBookmark = {jest.fn()}
        onHoverCard={jest.fn()}
        styleClassNames = {[
          `cities__places-list places__list tabs__content`,
          `cities__place-`,
          `cities__`
        ]}
      /> </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
