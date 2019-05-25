import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

describe(`App`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<App
        offers={[
          {
            id: 0,
            image: `path`,
            premium: true,
            price: 0,
            title: `title`,
            type: `type`,
            rating: 0,
            coordinates: [0, 0],
          }]
        }
        onClickTitleCard={jest.fn()}
        onClickImageCard={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
