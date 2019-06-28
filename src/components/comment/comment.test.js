import React from 'react';
import renderer from 'react-test-renderer';

import Comment from './comment.jsx';
import {mockComment} from '../../mocks/mock-comment.js';


describe(`Comment`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<Comment
        comment={mockComment}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
