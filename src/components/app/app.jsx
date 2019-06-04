import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const {
    onClickTitleCard,
    onClickImageCard,
    city,
    listCities,
    offers,
    onCityClick,
    redirect,
    isAuthorizationStatus,
    emailUser,
  } = props;


  return <MainPage
    offers = {offers}
    city = {city}
    listCities = {listCities}
    onClickTitleCard = {onClickTitleCard}
    onClickImageCard = {onClickImageCard}
    onCityClick = {onCityClick}
    redirect = {() => {
      if (emailUser === `Oliver.conner@gmail.com`) {
        // redirectStatus = true;
        redirect();
      }
    }}
    isAuthorizationStatus = {isAuthorizationStatus}
    emailUser = {emailUser}
  />;
  // }

};


App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
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
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
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
  })).isRequired,
  city: PropTypes.string.isRequired,
  listCities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  isAuthorizationStatus: PropTypes.bool.isRequired,
  emailUser: PropTypes.string.isRequired,
};


export default App;
