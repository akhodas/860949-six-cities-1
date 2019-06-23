import React from 'react';
import PropTypes from 'prop-types';

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
    offers: PropTypes.arrayOf(PropTypes.shape({
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
      isFavorite: PropTypes.bool.isRequired,
      isPremium: PropTypes.bool.isRequired,
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
    })).isRequired,
    city: PropTypes.string.isRequired,
    listCities: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickTitleCard: PropTypes.func.isRequired,
    onClickImageCard: PropTypes.func.isRequired,
    onCityClick: PropTypes.func.isRequired,
    isAuthorizationStatus: PropTypes.bool.isRequired,
    controlAuthorization: PropTypes.func.isRequired,
    emailUser: PropTypes.string.isRequired,
    flagDataIsLoading: PropTypes.bool.isRequired,
    activeOffer: PropTypes.object,
  };

  return WithMain;
};

export default withMain;
