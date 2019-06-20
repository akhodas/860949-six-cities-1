import React from 'react';
import renderer from 'react-test-renderer';

import Comment from './comment.jsx';

const mock = {
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
};

describe(`Comment`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<Comment
        comment={mock}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
