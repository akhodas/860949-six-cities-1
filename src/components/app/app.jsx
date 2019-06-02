import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MainPage from '../main-page/main-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withAuthorization from '../../hocs/with-authorization/with-authorization.js';
import {ActionCreator, Operation} from '../../reducer/user/user';
import {getCities, getOffers, getOffersForCity} from '../../reducer/data/selectors';
import {getCity, getAuthorizationStatus, getEmail} from '../../reducer/user/selectors';


const SignInWrapped = withAuthorization(SignIn);
let redirectStatus = false;

const App = (props) => {
  const {
    onClickTitleCard,
    onClickImageCard,
    city,
    listCities,
    listOffers,
    onCityClick,
    redirect,
    logIn,
    isAuthorizationStatus,
    emailUser,
  } = props;


  if (redirectStatus) {
    return <SignInWrapped
      logIn = {(e) => {
        redirectStatus = false;
        logIn(e);
      }}
    />;
  } else {
    return <MainPage
      offers = {listOffers}
      city = {city}
      listCities = {listCities}
      onClickTitleCard = {onClickTitleCard}
      onClickImageCard = {onClickImageCard}
      onCityClick = {onCityClick}
      redirect = {() => {
        if (emailUser === `Oliver.conner@gmail.com`) {
          redirectStatus = true;
          redirect();
        }
      }}
      isAuthorizationStatus = {isAuthorizationStatus}
      emailUser = {emailUser}
    />;
  }

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
  redirect: PropTypes.func.isRequired,
  emailUser: PropTypes.string.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  const newCity = (getCity(state) === `No cities` && getOffers(state)[0]) ?
    getOffers(state)[0].city.name : getCity(state);
  return Object.assign({}, ownProps, {
    emailUser: getEmail(state),
    city: newCity,
    listCities: getCities(state),
    listOffers: getOffersForCity(state, newCity),
    isAuthorizationStatus: getAuthorizationStatus(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (newCity) => {
    dispatch(ActionCreator.changeCity(newCity));
  },

  redirect: () => dispatch(ActionCreator.requireAuthorization(false)),

  logIn: (data) => dispatch(Operation.logIn(data)),
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
