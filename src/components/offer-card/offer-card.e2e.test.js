import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OfferCard from './offer-card.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`OfferCard`, () => {
  it(`click on title card correctly works`, () => {
    const clickHandler = jest.fn();
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
    />);

    const clickOnTitle = app.find(`.place-card__name a`);
    clickOnTitle.simulate(`click`, {preventDefault() {}});

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
