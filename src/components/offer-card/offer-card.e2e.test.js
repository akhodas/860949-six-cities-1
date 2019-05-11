import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OfferCard from './offer-card.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`OfferCard`, () => {
  it(`click on title card correctly works`, () => {
    const clickHandler = jest.fn();
    const app = shallow(<OfferCard
      placeName = {`Place #1`}
      clickOnTitleCard = {clickHandler}
    />);

    const clickOnTitle = app.find(`.place-card__name a`);
    clickOnTitle.simulate(`click`, {preventDefault() {}});

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
