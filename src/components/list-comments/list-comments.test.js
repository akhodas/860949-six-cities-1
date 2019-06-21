import React from 'react';
import renderer from 'react-test-renderer';

import ListComments from './list-comments.jsx';

const mock = [{
  id: 1,
  user: {
    id: 1,
    isPro: true,
    name: `qwer`,
    avatarUrl: `asdf`,
  },
  rating: 1,
  comment: `zxcv`,
  date: new Date(`2019-05-08T14:13:56.569Z`),
}];

describe(`ListComments`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<ListComments
        comments={mock}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
