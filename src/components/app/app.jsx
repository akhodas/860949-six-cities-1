import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Redirect, Route} from 'react-router-dom';

import Favorites from '../favorites/favorites.jsx';
import MainPage from '../main-page/main-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withAuthorization from '../../hocs/with-authorization/with-authorization.js';
import Room from '../room/room.jsx';
import withRoom from '../../hocs/with-room/with-room.js';


const SignInWrapped = withAuthorization(SignIn);
const RoomWrapped = withRoom(Room);


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
    isLoadData,
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
          isLoadData = {isLoadData}
        />
      )} />

      <Route path='/favorites' render={() => (
        isAuthorizationStatus ? (
          <Redirect to='/login'/>
        )
          : (
            <Favorites
              emailUser={emailUser}
              isAuthorizationStatus = {isAuthorizationStatus}
            />
          )
      )} />

      <Route path='/login' exact render={() => (
        isAuthorizationStatus ? (
          <SignInWrapped
            logIn = {logIn}
          />
        )
          : (
            <Redirect to='/'/>
          )
      )} />

      <Route path='/offer/:roomId' exact render={() => (
        <RoomWrapped
          emailUser={emailUser}
          isAuthorizationStatus = {isAuthorizationStatus}
          controlAuthorization = {controlAuthorization}
          isLoadData = {isLoadData}
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
  isLoadData: PropTypes.bool.isRequired,
};


export default App;
