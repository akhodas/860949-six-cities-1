import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {OfferCard} from './offer-card.jsx';
import { mockOffer } from '../../mocks/mockOffer.js';

Enzyme.configure({adapter: new Adapter()});

describe(`OfferCard`, () => {
  it(`click on title card correctly works and does not follow the link`, () => {
    const clickHandler = jest.fn();
    const formSendPrevention = jest.fn();
    const app = shallow(<OfferCard
      offer={mockOffer}
      onClickTitleCard={clickHandler}
      onClickImageCard={jest.fn()}
      onHoverCard={jest.fn()}
      styleClassNames = {[
        `cities__places-list places__list tabs__content`,
        `cities__place-`,
        `cities__`
      ]}
    />);

    const onClickTitle = app.find(`.place-card__name a`);
    onClickTitle.simulate(`click`, {preventDefault: formSendPrevention});

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });

  it(`click on image card correctly works and does not follow the link`, () => {
    const clickHandler = jest.fn();
    const formSendPrevention = jest.fn();
    const app = shallow(<OfferCard
      offer={mockOffer}
      onClickTitleCard={jest.fn()}
      onClickImageCard={clickHandler}
      onHoverCard={jest.fn()}
      styleClassNames = {[
        `cities__places-list places__list tabs__content`,
        `cities__place-`,
        `cities__`
      ]}
    />);

    const onClickImage = app.find(`.place-card__image-wrapper a`);
    onClickImage.simulate(`click`, {preventDefault: formSendPrevention});

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });


  it(`click on image card return correctly id card`, () => {
    const clickHandler = jest.fn();
    const app = shallow(<OfferCard
      offer={mockOffer}
      onClickTitleCard={jest.fn()}
      onClickImageCard={clickHandler}
      onHoverCard={jest.fn()}
      styleClassNames = {[
        `cities__places-list places__list tabs__content`,
        `cities__place-`,
        `cities__`
      ]}
    />);

    const onClickImage = app.find(`.place-card__image-wrapper a`);
    onClickImage.simulate(`click`, {preventDefault: jest.fn()});

    expect(clickHandler).toHaveBeenCalledWith(0);
  });
});
