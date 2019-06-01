import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../main-page/main-page.jsx';
import {ActionCreator} from '../../reducer/user/user';
import {getOffers} from '../../reducer/data/selectors';
import {getCity} from '../../reducer/user/selectors';


const App = (props) => {
  const {
    onClickTitleCard,
    onClickImageCard,
    city,
    listOffers,
    onCityClick,
  } = props;

  const listOffersForCity = listOffers.filter((offer) => city === offer.city.name);

  const listCities = [];
  listOffers.forEach((offer) => {
    if (listCities.indexOf(offer.city.name) < 0 && listCities.length < 6) {
      listCities.push(offer.city.name);
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
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    previewImage: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    isFavorite: false,
    isPremium: false,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired),
    host: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
  city: PropTypes.string.isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    city: (getCity(state) === `No cities` && getOffers(state)[0]) ?
      getOffers(state)[0].city.name
      :
      getCity(state),
    listOffers: getOffers(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (newCity) => {
    dispatch(ActionCreator.changeCity(newCity));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
