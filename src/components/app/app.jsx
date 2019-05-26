import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const {offers, onClickTitleCard, onClickImageCard} = props;

  return <MainPage
    offers={offers}
    onClickTitleCard={onClickTitleCard}
    onClickImageCard={onClickImageCard}
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
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func.isRequired,
};

export default App;
