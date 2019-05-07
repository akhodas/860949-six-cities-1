import React from "react";
import PropTypes from "prop-types";
import {Stateless} from "../stateless/stateless.jsx";

export const App = (props) => {
  const {placeCardNames, clickOnTitleCard} = props;

  return <Stateless
    placeNames = {placeCardNames}
    clickOnTitleCard = {clickOnTitleCard}
  />;
};

App.propTypes = {
  placeCardNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  clickOnTitleCard: PropTypes.func.isRequired,
};
