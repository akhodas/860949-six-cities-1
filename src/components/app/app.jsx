import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const {offers, onClickTitleCard, onClickImageCard, city} = props;

  return <MainPage
    offers={offers}
    city={city}
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
    city: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  city: PropTypes.string.isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: ownProps.offers[0] ? ownProps.offers[0].city : `No cities`,
  listOffers: ownProps.offers,
});
const mapDispatchToProps = () => ({});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
