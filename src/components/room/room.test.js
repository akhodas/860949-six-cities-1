import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';

import Room from './room.jsx';

describe(`Room`, () => {
  it(`correctly rendered with isLoadData=true`, () => {
    const tree = renderer
      .create(<MemoryRouter> <Room
        room={{
          id: 0,
          city: {
            name: `Minsk`,
            location: {
              latitude: 0,
              longitude: 0,
              zoom: 5,
            },
          },
          previewImage: `path`,
          images: [`path1`, `path2`],
          title: `title`,
          isFavorite: true,
          isPremium: true,
          rating: 0,
          type: `type`,
          bedrooms: 0,
          maxAdults: 0,
          price: 0,
          goods: [`goods1`, `goods2`],
          host: {
            id: 1,
            isPro: true,
            name: `name`,
            avatarUrl: `pathAvatar`
          },
          description: `description`,
          location: {
            latitude: 1,
            longitude: 1,
            zoom: 8
          }
        }}
        images={[`path1`, `path2`]}
        emailUser={`myEmail@mail.com`}
        isAuthorizationStatus={true}
        controlAuthorization={jest.fn()}
        isLoadData={true}
        comments={[]}
      /> </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`correctly rendered with isLoadData=false`, () => {
    const tree = renderer
      .create(<MemoryRouter> <Room
        room={{
          id: 0,
          city: {
            name: `Minsk`,
            location: {
              latitude: 0,
              longitude: 0,
              zoom: 5,
            },
          },
          previewImage: `path`,
          images: [`path1`, `path2`],
          title: `title`,
          isFavorite: true,
          isPremium: true,
          rating: 0,
          type: `type`,
          bedrooms: 0,
          maxAdults: 0,
          price: 0,
          goods: [`goods1`, `goods2`],
          host: {
            id: 1,
            isPro: true,
            name: `name`,
            avatarUrl: `pathAvatar`
          },
          description: `description`,
          location: {
            latitude: 1,
            longitude: 1,
            zoom: 8
          }
        }}
        images={[`path1`, `path2`]}
        emailUser={`myEmail@mail.com`}
        isAuthorizationStatus={true}
        controlAuthorization={jest.fn()}
        isLoadData={true}
        comments={[]}
      /> </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
