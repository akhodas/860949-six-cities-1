import React from 'react';
import PropTypes from 'prop-types';
import {compose} from "recompose";
import {connect} from 'react-redux';

import {ActionCreator as ActionCreatorData} from '../../reducer/data/data';
import {Operation as OperationUser} from '../../reducer/user/user';
import {getCity, getCities, getOffers, getOffersForCity} from '../../reducer/data/selectors';
import {getAuthorizationStatus, getEmail} from '../../reducer/user/selectors';


const withScreenSwitch = (Component) => {
  const WithScreenSwitch = (props) => {
    return <Component
      {...props}
    />;
  };

  WithScreenSwitch.propTypes = {
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

  return WithScreenSwitch;
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
    dispatch(ActionCreatorData.changeCity(newCity));
  },

  controlAuthorization: () => {
    dispatch(OperationUser.addUserData());
  },

  logIn: (data) => {
    dispatch(OperationUser.logIn(data));
  },
});


export {withScreenSwitch};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
