import React from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

const ListOffers = (props) => {
  const {offers, clickOnTitleCard} = props;

  const placesList = offers.map((item, i) =>
    <OfferCard
      key={i}
      placeName={item}
      clickOnTitleCard={clickOnTitleCard}
    />
  );

  return <div className="cities__places-list places__list tabs__content">
    {placesList}
  </div>;
};

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
};

export default ListOffers;
