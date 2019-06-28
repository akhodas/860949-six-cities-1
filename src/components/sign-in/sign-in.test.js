import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';

import SignIn from './sign-in.jsx';

describe(`SignIn`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(
          <MemoryRouter>
            <SignIn
              email={`email`}
              password={`password`}
              onLogIn={jest.fn()}
              onChange={jest.fn()}
            />
          </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
