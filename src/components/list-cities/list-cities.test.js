import React from 'react';
import renderer from 'react-test-renderer';

import ListCities from './list-cities.jsx';


describe(`ListCities`, () => {
  it(`correctly rendered`, () => {
    const tree = renderer
    .create(<ListCities
      selectedCity = {`Minsk`}
      listCities = {[`Minsk`, `London`, `Paris`]}
      onCityClick = {jest.fn()}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
