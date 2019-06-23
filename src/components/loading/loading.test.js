import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';

import Loading from './loading.jsx';

describe(`Loading`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
      .create(
          <MemoryRouter>
            <Loading
              isAuthorizationStatus = {false}
              controlAuthorization = {jest.fn()}
              emailUser = {`email@email.com`}
            />
          </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
