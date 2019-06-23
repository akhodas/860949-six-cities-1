import React from 'react';
import PropTypes from 'prop-types';
import {offerProp} from '../../interface-prop-types/interface-prop-types';

const withMain = (Component) => {
  class WithMain extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeOffer: null,
      };

      this._onChangeActiveOffer = this._onChangeActiveOffer.bind(this);
    }

    componentDidUpdate(prevProps) {
      if ((prevProps.offers[0] && prevProps.offers[0].id) !==
            (this.props.offers[0] && this.props.offers[0].id)) {
        this.setState({activeOffer: null});
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          activeOffer={this.state.activeOffer}
          onChangeActiveOffer={this._onChangeActiveOffer}
        />
      );
    }

    _onChangeActiveOffer(offer) {
      this.setState({activeOffer: offer});
    }
  }

  WithMain.propTypes = {
    offers: PropTypes.arrayOf(offerProp.isRequired).isRequired,
    city: PropTypes.string.isRequired,
    listCities: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickTitleCard: PropTypes.func.isRequired,
    onClickImageCard: PropTypes.func.isRequired,
    onCityClick: PropTypes.func.isRequired,
    isAuthorizationStatus: PropTypes.bool.isRequired,
    controlAuthorization: PropTypes.func.isRequired,
    emailUser: PropTypes.string.isRequired,
    flagDataIsLoading: PropTypes.bool.isRequired,
    activeOffer: offerProp,
  };

  return WithMain;
};

export default withMain;
