import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';

import Room from './room.jsx';
import {mockOffer, mockOffers} from '../../mocks/mock-offer.js';


describe(`Room`, () => {
  it(`correctly rendered with flagDataIsLoading=true`, () => {
    const tree = renderer
      .create(<MemoryRouter> <Room
        offer={mockOffer}
        offersNear={mockOffers}
        emailUser={`myEmail@mail.com`}
        isAuthorizationStatus={true}
        onControlAuthorization={jest.fn()}
        onClickBookmark = {jest.fn()}
        flagDataIsLoading={true}
        comments={[]}
        sendComment={jest.fn()}
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
        onControlAuthorization={jest.fn()}
        onClickBookmark = {jest.fn()}
        flagDataIsLoading={true}
        comments={[]}
        sendComment={jest.fn()}
      /> </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
