import React from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';
import {offerProp} from '../../interface-prop-types/interface-prop-types.js';

class ListOffers extends React.PureComponent {

  render() {
    const {
      offers,
      onClickTitleCard,
      styleClassNames,
      onChangeActiveOffer,
      onClickBookmark,
    } = this.props;

    return <div className={styleClassNames[0]}>
      {offers.map((item) => <OfferCard
        key={item.id}
        offer={item}
        onClickTitleCard={onClickTitleCard}
        onChangeActiveOffer={onChangeActiveOffer}
        onClickBookmark={onClickBookmark}
        styleClassNames = {styleClassNames}
      />)
      }
    </div>;
  }
}

ListOffers.propTypes = {
  offers: PropTypes.arrayOf(offerProp.isRequired).isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onChangeActiveOffer: PropTypes.func,
  styleClassNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickBookmark: PropTypes.func.isRequired,
};

export default ListOffers;
