import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';


import ListOffers from './list-offers.jsx';
import {mockOffer} from '../../mocks/mockOffer.js';

describe(`ListOffers`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
        .create(<MemoryRouter> <ListOffers
          offers={[mockOffer]}
          onClickTitleCard = {jest.fn()}
          onClickImageCard = {jest.fn()}
          onChangeActiveOffer = {jest.fn()}
          onClickBookmark = {jest.fn()}
          onItemActivate = {jest.fn()}
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
