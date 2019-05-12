import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const {offers, clickOnTitleCard, clickOnImageCard} = props;

  return <MainPage
    offers={offers}
    clickOnTitleCard={clickOnTitleCard}
    clickOnImageCard={clickOnImageCard}
  />;
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  })).isRequired,
  clickOnTitleCard: PropTypes.func.isRequired,
  clickOnImageCard: PropTypes.func.isRequired,
};

export default App;
