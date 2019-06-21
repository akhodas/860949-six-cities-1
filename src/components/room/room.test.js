import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';

import Room from './room.jsx';
import {mockOffer, mockOffers} from '../../mocks/mockOffer.js';


describe(`Room`, () => {
  it(`correctly rendered with flagDataIsLoading=true`, () => {
    const tree = renderer
      .create(<MemoryRouter> <Room
        offer={mockOffer}
        offersNear={mockOffers}
        emailUser={`myEmail@mail.com`}
        isAuthorizationStatus={true}
        controlAuthorization={jest.fn()}
        flagDataIsLoading={true}
        comments={[]}
      /> </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`correctly rendered with flagDataIsLoading=false`, () => {
    const tree = renderer
      .create(<MemoryRouter> <Room
        offer={mockOffer}
        offersNear={mockOffers}
        emailUser={`myEmail@mail.com`}
        isAuthorizationStatus={true}
        controlAuthorization={jest.fn()}
        flagDataIsLoading={true}
        comments={[]}
      /> </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
