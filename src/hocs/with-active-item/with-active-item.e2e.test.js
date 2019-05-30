import Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import React from "react";

import withActiveItem from "./with-active-item";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;

const MockComponentWrapped = withActiveItem(MockComponent);

it(`Should change activeItem when call onItemActivate`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  wrapper.props().onItemActivate({
    id: 100,
    image: `path`,
    premium: true,
    price: 0,
    title: `title`,
    type: `type`,
    rating: 0,
  });

  expect(wrapper.props().activeItem).toEqual({
    id: 100,
    image: `path`,
    premium: true,
    price: 0,
    title: `title`,
    type: `type`,
    rating: 0,
  });
});
