import React from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

const ListOffers = (props) => {
  const {placeNames, clickOnTitleCard} = props;

  const placesList = placeNames.map((item, i) =>
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
  placeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  clickOnTitleCard: PropTypes.func.isRequired,
};

export default ListOffers;
