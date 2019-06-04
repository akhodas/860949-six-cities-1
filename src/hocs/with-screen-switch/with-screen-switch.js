import React from 'react';
import PropTypes from 'prop-types';
import {compose} from "recompose";
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
// import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

// import MainPage from '../main-page/main-page.jsx';
import SignIn from '../../components/sign-in/sign-in.jsx';
import withAuthorization from '../with-authorization/with-authorization.js';
import {ActionCreator as ActionCreatorData} from '../../reducer/data/data';
import {ActionCreator as ActionCreatorUser, Operation} from '../../reducer/user/user';
import {getCity, getCities, getOffers, getOffersForCity} from '../../reducer/data/selectors';
import {getAuthorizationStatus, getEmail} from '../../reducer/user/selectors';
import App from '../../components/app/app.jsx';


const SignInWrapped = withAuthorization(SignIn);
let redirectStatus = false;

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends React.PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
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
      } = this.props;

      // console.log(listOffers);


      // return (
      //   <Switch>
      //     <Route path='/' exact render={() => (
      //       <Component
      //         // {...this.props}
      //         offers = {listOffers}
      //         city = {city}
      //         listCities = {listCities}
      //         onClickTitleCard = {onClickTitleCard}
      //         onClickImageCard = {onClickImageCard}
      //         onCityClick = {onCityClick}
      //         redirect = {() => {
      //           if (emailUser === `Oliver.conner@gmail.com`) {
      //             // redirectStatus = true;
      //             redirect();
      //           }
      //         }}
      //         isAuthorizationStatus = {isAuthorizationStatus}
      //         emailUser = {emailUser}
      //       />
      //     )} />
      //     <Route path='/login' exact render={() => (
      //       <SignInWrapped
      //         logIn = {(e) => {
      //           // redirectStatus = false;
      //           logIn(e);
      //         }}
      //       />
      //     )} />
      //   </Switch>
      // );
      if (redirectStatus) {
        return <SignInWrapped
          logIn = {(e) => {
            redirectStatus = false;
            logIn(e);
          }}
        />;
      } else {
        return <App
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
    }
  }

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
    redirect: PropTypes.func.isRequired,
    emailUser: PropTypes.string.isRequired,
    isAuthorizationStatus: PropTypes.bool.isRequired,
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

  redirect: () => dispatch(ActionCreatorUser.requireAuthorization(false)),

  logIn: (data) => dispatch(Operation.logIn(data)),
});


export {withScreenSwitch};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
