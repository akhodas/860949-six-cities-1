import React from 'react';
import renderer from 'react-test-renderer';

import ListComments from './list-comments.jsx';
import {mockUser} from '../../mocks/mock-user.js';


describe(`ListComments`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<ListComments
        comments={[mockUser]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
