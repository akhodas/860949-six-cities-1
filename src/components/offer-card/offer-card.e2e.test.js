import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import OfferCard from './offer-card.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`OfferCard`, () => {
  it(`click on title card correctly works and does not follow the link`, () => {
    const clickHandler = jest.fn();
    const formSendPrevention = jest.fn();
    const app = shallow(<OfferCard
      offer={
        {
          id: 0,
          image: `path`,
          premium: true,
          price: 0,
          title: `title`,
          type: `type`,
          rating: 0,
        }
      }
      clickOnTitleCard={clickHandler}
      clickOnImageCard={jest.fn()}
    />);

    const clickOnTitle = app.find(`.place-card__name a`);
    clickOnTitle.simulate(`click`, {preventDefault: formSendPrevention});

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });

  it(`click on image card correctly works and does not follow the link`, () => {
    const clickHandler = jest.fn();
    const formSendPrevention = jest.fn();
    const app = shallow(<OfferCard
      offer={
        {
          id: 0,
          image: `path`,
          premium: true,
          price: 0,
          title: `title`,
          type: `type`,
          rating: 0,
        }
      }
      clickOnTitleCard={jest.fn()}
      clickOnImageCard={clickHandler}
    />);

    const clickOnImage = app.find(`.place-card__image-wrapper a`);
    clickOnImage.simulate(`click`, {preventDefault: formSendPrevention});

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });


  it(`click on image card return correctly id card`, () => {
    const clickHandler = jest.fn();
    const app = shallow(<OfferCard
      offer={
        {
          id: 100,
          image: `path`,
          premium: true,
          price: 0,
          title: `title`,
          type: `type`,
          rating: 0,
        }
      }
      clickOnTitleCard={jest.fn()}
      clickOnImageCard={clickHandler}
    />);

    const clickOnImage = app.find(`.place-card__image-wrapper a`);
    clickOnImage.simulate(`click`, {preventDefault: jest.fn()});

    expect(clickHandler).toHaveBeenCalledWith(100);
  });
});
