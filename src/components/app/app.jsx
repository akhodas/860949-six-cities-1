import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../main-page/main-page.jsx';
import {ActionCreator} from '../../reducer/user/user';
import {getCities, getOffers, getOffersForCity} from '../../reducer/data/selectors';
import {getCity} from '../../reducer/user/selectors';


const App = (props) => {
  const {
    onClickTitleCard,
    onClickImageCard,
    city,
    listCities,
    listOffers,
    onCityClick,
  } = props;


  return <MainPage
    offers = {listOffers}
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
  listCities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  const newCity = (getCity(state) === `No cities` && getOffers(state)[0]) ?
    getOffers(state)[0].city.name : getCity(state);
  return Object.assign({}, ownProps, {
    city: newCity,
    listCities: getCities(state),
    listOffers: getOffersForCity(state, newCity),
  });
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (newCity) => {
    dispatch(ActionCreator.changeCity(newCity));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
