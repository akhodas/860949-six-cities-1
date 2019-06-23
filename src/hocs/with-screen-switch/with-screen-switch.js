import React from 'react';
import PropTypes from 'prop-types';
import {compose} from "recompose";
import {connect} from 'react-redux';

import {ActionCreator as ActionCreatorData} from '../../reducer/data/data';
import {Operation as OperationUser} from '../../reducer/user/user';
import {getCity, getCities, getOffers, getOffersForCity, getFlagDataIsLoading} from '../../reducer/data/selectors';
import {getAuthorizationStatus, getEmail} from '../../reducer/user/selectors';
import {offerProp} from '../../interface-prop-types/interface-prop-types';


const withScreenSwitch = (Component) => {
  const WithScreenSwitch = (props) => {
    return <Component
      {...props}
    />;
  };

  WithScreenSwitch.propTypes = {
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
    flagDataIsLoading: getFlagDataIsLoading(state),
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
