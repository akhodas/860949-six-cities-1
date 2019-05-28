import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MainPage from '../main-page/main-page.jsx';
import {ActionCreator} from '../../reducer';


const App = (props) => {
  const {
    onClickTitleCard,
    onClickImageCard,
    city,
    listOffers,
    onCityClick,
  } = props;

  const listOffersForCity = listOffers.filter((offer) => city === offer.city);

  const listCities = [];
  listOffers.forEach((offer) => {
    if (listCities.indexOf(offer.city) < 0 && listCities.length < 6) {
      listCities.push(offer.city);
    }
  });

  return <MainPage
    offers = {listOffersForCity}
    city = {city}
    listCities = {listCities}
    onClickTitleCard = {onClickTitleCard}
    onClickImageCard = {onClickImageCard}
    onCityClick = {onCityClick}
  />;
};


App.propTypes = {
  listOffers: PropTypes.arrayOf(PropTypes.shape({
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
  onCityClick: PropTypes.func.isRequired,
  addOffers: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    city: state.city,
    listOffers: state.listOffers,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (newCity) => {
    dispatch(ActionCreator.changeCity(newCity));
  },
  addOffers: (offers) => {
    dispatch(ActionCreator.addListOffers(offers));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
