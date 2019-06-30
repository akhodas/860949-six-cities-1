import React from 'react';
import PropTypes from 'prop-types';
import {compose} from "recompose";
import {connect} from 'react-redux';

import {
  ActionCreator as ActionCreatorData,
  Operation as OperationData
} from '../../reducer/data/data';
import {Operation as OperationUser} from '../../reducer/user/user';
import {
  getCity,
  getCities,
  getOffers,
  getOffersForCity,
  getFlagDataIsLoading,
} from '../../reducer/data/selectors';
import {getAuthorizationStatus, getEmail} from '../../reducer/user/selectors';
import {offerProp} from '../../interface-prop-types/interface-prop-types';
import Loading from '../../components/loading/loading.jsx';


const withStart = (Component) => {
  class WithStart extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        loadingData: true,
      };

      this._handleStatusAuthorizationChange = this._handleStatusAuthorizationChange.bind(this);
    }

    componentDidMount() {
      const {onControlAuthorization} = this.props;

      onControlAuthorization()
        .then(() => {
          this.setState({loadingData: false});
        })
        .catch(() => {
          this.setState({loadingData: false});
        });
    }

    render() {
      const {isAuthorizationStatus, onControlAuthorization, emailUser
      } = this.props;

      return !this.state.loadingData ? (
        <Component
          {...this.props}
          onControlAuthorization={() => {
            this._handleStatusAuthorizationChange();
          }}
        />
      ) : (
        <Loading
          isAuthorizationStatus={isAuthorizationStatus}
          onControlAuthorization={onControlAuthorization}
          emailUser={emailUser}
        />
      );
    }

    _handleStatusAuthorizationChange() {
      this.setState({loadingData: true});

      this.props.onControlAuthorization()
      .then(() => {
        this.setState({loadingData: false});
      })
      .catch(() => {
        this.setState({loadingData: false});
      });
    }
  }

  WithStart.propTypes = {
    listOffers: PropTypes.arrayOf(offerProp.isRequired).isRequired,
    city: PropTypes.string.isRequired,
    listCities: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickTitleCard: PropTypes.func.isRequired,
    onCityClick: PropTypes.func.isRequired,
    onLogIn: PropTypes.func.isRequired,
    emailUser: PropTypes.string.isRequired,
    isAuthorizationStatus: PropTypes.bool.isRequired,
    onControlAuthorization: PropTypes.func.isRequired,
    flagDataIsLoading: PropTypes.bool.isRequired,
    onClickBookmark: PropTypes.func.isRequired,
  };

  return WithStart;
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

  onControlAuthorization: () => {
    return dispatch(OperationUser.addUserData());
  },

  onLogIn: (data) => {
    dispatch(OperationUser.onLogIn(data));
  },

  onClickBookmark: (data) => {
    dispatch(
        OperationData.changeFavoritesStatus(
            data.idOffer,
            data.favoriteStatus,
            data.objHistory
        )
    );
  },
});


export {withStart};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStart
);
