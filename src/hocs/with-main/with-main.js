import React from 'react';
import PropTypes from 'prop-types';
import {offerProp} from '../../interface-prop-types/interface-prop-types';
import Loading from '../../components/loading/loading.jsx';


const withMain = (Component) => {
  class WithMain extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeOffer: null,
      };

      this._handleOfferChange = this._handleOfferChange.bind(this);
    }

    componentDidUpdate(prevProps) {
      if ((prevProps.offers[0] && prevProps.offers[0].id) !==
            (this.props.offers[0] && this.props.offers[0].id)) {
        this.setState({activeOffer: null});
      }
    }

    render() {
      const {
        flagDataIsLoading,
        isAuthorizationStatus,
        onControlAuthorization,
        emailUser,
      } = this.props;

      return (flagDataIsLoading ? (
        <Component
          {...this.props}
          activeOffer={this.state.activeOffer}
          onChangeActiveOffer={this._handleOfferChange}
        />
      ) : (
        <Loading
          isAuthorizationStatus={isAuthorizationStatus}
          onControlAuthorization={onControlAuthorization}
          emailUser={emailUser}
        />
      ));
    }

    _handleOfferChange(offer) {
      this.setState({activeOffer: offer});
    }
  }

  WithMain.propTypes = {
    offers: PropTypes.arrayOf(offerProp.isRequired).isRequired,
    city: PropTypes.string.isRequired,
    listCities: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickTitleCard: PropTypes.func.isRequired,
    onCityClick: PropTypes.func.isRequired,
    isAuthorizationStatus: PropTypes.bool.isRequired,
    onControlAuthorization: PropTypes.func.isRequired,
    emailUser: PropTypes.string.isRequired,
    flagDataIsLoading: PropTypes.bool.isRequired,
    activeOffer: offerProp,
    onClickBookmark: PropTypes.func.isRequired,
  };

  return WithMain;
};

export default withMain;
