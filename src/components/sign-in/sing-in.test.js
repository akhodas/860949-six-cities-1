import React from 'react';
import renderer from 'react-test-renderer';

import SignIn from './sign-in.jsx';

describe(`SignIn`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(<SignIn
        email={`email`}
        password={`password`}
        logIn={jest.fn()}
        onChange={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
