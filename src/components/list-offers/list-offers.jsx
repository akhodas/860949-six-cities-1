import React from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';
import {offerProp} from '../../interface-prop-types/interface-prop-types.js';

class ListOffers extends React.PureComponent {

  render() {
    const {
      offers,
      onClickTitleCard,
      onClickImageCard,
      onItemActivate,
      styleClassNames,
      onChangeActiveOffer,
      onClickBookmark,
    } = this.props;

    return <div className={styleClassNames[0]}>
      {offers.map((item) => <OfferCard
        key={item.id}
        offer={item}
        onClickTitleCard={onClickTitleCard}
        onClickImageCard={onClickImageCard}
        onChangeActiveOffer={onChangeActiveOffer}
        onClickBookmark={onClickBookmark}
        onHoverCard={(e) => {
          onItemActivate(item, e);
        }}
        styleClassNames = {styleClassNames}
      />)
      }
    </div>;
  }
}

ListOffers.propTypes = {
  offers: PropTypes.arrayOf(offerProp.isRequired).isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func,
  onChangeActiveOffer: PropTypes.func,
  onItemActivate: PropTypes.func.isRequired,
  styleClassNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickBookmark: PropTypes.func.isRequired,
};

export default ListOffers;
