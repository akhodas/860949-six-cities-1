import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';

describe(`App`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<App
        listOffers = {[
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
        city = {`Minsk`}
        onClickTitleCard = {jest.fn()}
        onClickImageCard = {jest.fn()}
        onCityClick = {jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
