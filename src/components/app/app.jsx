import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Redirect, Route} from 'react-router-dom';

import Favorites from '../favorites/favorites.jsx';
import MainPage from '../main-page/main-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withAuthorization from '../../hocs/with-authorization/with-authorization.js';
import Room from '../room/room.jsx';
import withRoom from '../../hocs/with-room/with-room.js';
import withMain from '../../hocs/with-main/with-main.js';
import {offerProp} from '../../interface-prop-types/interface-prop-types.js';
import withFavorite from '../../hocs/with-favorite/with-favorite.js';


const SignInWrapped = withAuthorization(SignIn);
const RoomWrapped = withRoom(Room);
const MainPageWrapped = withMain(MainPage);
const FavoritesWrapped = withFavorite(Favorites);


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
    flagDataIsLoading,
    onClickBookmark,
  } = props;

  return (
    <Switch>
      <Route path='/' exact render={() => (
        <MainPageWrapped
          offers = {listOffers}
          city = {city}
          listCities = {listCities}
          onClickTitleCard = {onClickTitleCard}
          onClickImageCard = {onClickImageCard}
          onClickBookmark = {onClickBookmark}
          onCityClick = {onCityClick}
          isAuthorizationStatus = {isAuthorizationStatus}
          controlAuthorization = {controlAuthorization}
          emailUser = {emailUser}
          flagDataIsLoading = {flagDataIsLoading}
        />
      )} />

      <Route path='/favorites' render={() => (
        isAuthorizationStatus ? (
          <Redirect to='/login'/>
        )
          : (
            <FavoritesWrapped
              emailUser={emailUser}
              isAuthorizationStatus = {isAuthorizationStatus}
              controlAuthorization = {controlAuthorization}
              flagDataIsLoading = {flagDataIsLoading}
              onClickTitleCard = {onClickTitleCard}
              onClickImageCard = {onClickImageCard}
              onClickBookmark = {onClickBookmark}
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
          flagDataIsLoading = {flagDataIsLoading}
          onClickBookmark = {onClickBookmark}
        />
      )} />

    </Switch>
  );
};


App.propTypes = {
  listOffers: PropTypes.arrayOf(offerProp.isRequired).isRequired,
  city: PropTypes.string.isRequired,
  listCities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
  emailUser: PropTypes.string.isRequired,
  isAuthorizationStatus: PropTypes.bool.isRequired,
  controlAuthorization: PropTypes.func.isRequired,
  flagDataIsLoading: PropTypes.bool.isRequired,
  onClickBookmark: PropTypes.func.isRequired,
};


export default App;
