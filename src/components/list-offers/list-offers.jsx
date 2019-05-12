import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

// const ListOffers = (props) => {
//     const { offers, clickOnTitleCard, clickOnImageCard } = props;

//     const placesList = offers.map((item) =>
//         <OfferCard
//             key={item.id}
//             offer={item}
//             clickOnTitleCard={clickOnTitleCard}
//             clickOnImageCard={clickOnImageCard}
//         />
//     );

//     return <div className="cities__places-list places__list tabs__content">
//         {placesList}
//     </div>;
// };

class ListOffers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {},
    };

    this.activateCard = this.activateCard.bind(this);
  }

  activateCard(e, card) {
    this.setState({activeCard: card});
    // eslint-disable-next-line no-console
    console.log(card.id);
    // eslint-disable-next-line no-console
    console.log(this.state.activeCard.title);
  }

  render() {
    const {offers, clickOnTitleCard, clickOnImageCard} = this.props;

    return <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => {
        return <article
          className="cities__place-card place-card"
          key={item.id}
          onMouseEnter={(e) => {
            this.activateCard(e, item);
          }}>
          <OfferCard
            offer={item}
            clickOnTitleCard={clickOnTitleCard}
            clickOnImageCard={clickOnImageCard}
          />
        </article>;
      }

      )}
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
  clickOnTitleCard: PropTypes.func.isRequired,
  clickOnImageCard: PropTypes.func.isRequired,
};

export default ListOffers;
