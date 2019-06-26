import React from 'react';
import {compose} from "recompose";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getFavoriteOffers} from '../../reducer/data/selectors';
import {Operation} from '../../reducer/data/data';
import Loading from '../../components/loading/loading.jsx';
import {offerProp} from '../../interface-prop-types/interface-prop-types';


const withFavorite = (Component) => {
  class WithFavorite extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        flagFavoriteOffersIsLoading: false,
        password: `password`,
      };
    }

    componentDidMount() {
      const {
        flagDataIsLoading,
        loadFavoriteOffers,
      } = this.props;

      if (flagDataIsLoading && !this.state.flagFavoriteOffersIsLoading) {
        loadFavoriteOffers();
        this.setState({flagFavoriteOffersIsLoading: true});
      }
    }

    render() {
      const {
        favoriteOffers,
        flagDataIsLoading,
        isAuthorizationStatus,
        controlAuthorization,
        emailUser,
      } = this.props;

      const listFavoriteOffersSortByCities = [];

      for (let i = 0; i < favoriteOffers.length; i++) {
        const listfavoriteOffersForCity = [favoriteOffers[i]];
        i++;

        while (i < favoriteOffers.length
        && favoriteOffers[i - 1].city.name === favoriteOffers[i].city.name) {
          listfavoriteOffersForCity.push(favoriteOffers[i]);
          i++;
        }

        listFavoriteOffersSortByCities.push(listfavoriteOffersForCity);
      }

      return flagDataIsLoading && this.state.flagFavoriteOffersIsLoading ? (
        <Component
          {...this.props}
          favoriteOffers={listFavoriteOffersSortByCities}
        />
      ) : (
        <Loading
          isAuthorizationStatus={isAuthorizationStatus}
          controlAuthorization={controlAuthorization}
          emailUser={emailUser}
        />
      );
    }

  }

  WithFavorite.propTypes = {
    favoriteOffers: PropTypes.arrayOf(offerProp),
    loadFavoriteOffers: PropTypes.func.isRequired,
    emailUser: PropTypes.string.isRequired,
    isAuthorizationStatus: PropTypes.bool.isRequired,
    controlAuthorization: PropTypes.func.isRequired,
    flagDataIsLoading: PropTypes.bool.isRequired,
  };

  return WithFavorite;
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    favoriteOffers: getFavoriteOffers(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteOffers: () => {
    dispatch(Operation.loadFavoriteOffers());
  },
});

export {withFavorite};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withFavorite
);
