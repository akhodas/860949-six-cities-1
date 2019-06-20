import React from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

class ListOffers extends React.PureComponent {

  render() {
    const {offers, onClickTitleCard, onClickImageCard, onItemActivate} = this.props;

    return <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => <OfferCard
        key={`offer-${item.id}`}
        offer={item}
        onClickTitleCard={onClickTitleCard}
        onClickImageCard={onClickImageCard}
        onHoverCard={(e) => {
          onItemActivate(item, e);
        }}
      />)
      }
    </div>;
  }
}

ListOffers.propTypes = {
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
  }).isRequired).isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func.isRequired,
  onItemActivate: PropTypes.func.isRequired,
};

export default ListOffers;
