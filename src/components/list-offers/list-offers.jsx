import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

class ListOffers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {},
    };

    this.handleCardActivate = this.handleCardActivate.bind(this);
  }

  handleCardActivate(e, card) {
    this.setState({activeCard: card});
    // eslint-disable-next-line no-console
    console.log(`Activate card #${card.id}`);
    // eslint-disable-next-line no-console
    console.log(`Title last ativate card: "${
      this.state.activeCard.title}"!!! (because "setState" asynk)`);
  }

  render() {
    const {offers, onClickTitleCard, onClickImageCard} = this.props;

    return <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => <OfferCard
        key={item.id}
        offer={item}
        onClickTitleCard={onClickTitleCard}
        onClickImageCard={onClickImageCard}
        onHoverCard={(e) => {
          this.handleCardActivate(e, item);
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
};

export default ListOffers;
