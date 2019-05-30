import React from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

class ListOffers extends React.PureComponent {

  render() {
    const {offers, onClickTitleCard, onClickImageCard, onItemActivate} = this.props;

    return <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => <OfferCard
        key={item.id}
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
    image: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  })).isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func.isRequired,
  onItemActivate: PropTypes.func.isRequired,
};

export default ListOffers;
