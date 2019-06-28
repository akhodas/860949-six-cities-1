import React from 'react';
import renderer from 'react-test-renderer';

import CommentSubmitionForm from './comment-submition-form.jsx';


describe(`CommentSubmitionForm`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(
          <CommentSubmitionForm
            rating={3}
            commentText={`comment`}
            blockForm={false}
            successSend={false}
            onSubmit={jest.fn()}
            onChangeText={jest.fn()}
            onChangeRating={jest.fn()}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
