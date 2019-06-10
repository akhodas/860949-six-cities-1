import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import Favorites from '../favorites/favorites.jsx';
import MainPage from '../main-page/main-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withAuthorization from '../../hocs/with-authorization/with-authorization.js';
import Room from '../room/room.jsx';


const SignInWrapped = withAuthorization(SignIn);


const App = (props) => {
  const {
    onClickTitleCard,
    onClickImageCard,
    city,
    listCities,
    listOffers,
    onCityClick,
    logIn,
    isAuthorizationStatus,
    controlAuthorization,
    emailUser,
  } = props;

  return (
    <Switch>
      <Route path='/' exact render={() => (
        <MainPage
          offers = {listOffers}
          city = {city}
          listCities = {listCities}
          onClickTitleCard = {onClickTitleCard}
          onClickImageCard = {onClickImageCard}
          onCityClick = {onCityClick}
          isAuthorizationStatus = {isAuthorizationStatus}
          controlAuthorization = {controlAuthorization}
          emailUser = {emailUser}
        />
      )} />

      <Route path='/favorites' render={() => (
        <Favorites
          emailUser={emailUser}
          isAuthorizationStatus = {isAuthorizationStatus}
        />
      )} />

      <Route path='/login' exact render={() => (
        <SignInWrapped
          logIn = {logIn}
        />
      )} />

      <Route path='/offer/5' exact render={() => (
        <Room
        />
      )} />

    </Switch>
  );
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
  listCities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
  emailUser: PropTypes.string.isRequired,
  isAuthorizationStatus: PropTypes.bool.isRequired,
  controlAuthorization: PropTypes.func.isRequired,
};


export default App;
