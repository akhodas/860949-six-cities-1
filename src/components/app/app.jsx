import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import {ActionCreator} from '../../reducer';
import MainPage from '../main-page/main-page.jsx';


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
    previewImage: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
    }).isRequired,
  })).isRequired,
  city: PropTypes.string.isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    city: (state.city === `No cities` && state.listOffers[0]) ?
      state.listOffers[0].city.name
      :
      state.city,
    listOffers: state.listOffers,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (newCity) => {
    dispatch(ActionCreator.changeCity(newCity));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
