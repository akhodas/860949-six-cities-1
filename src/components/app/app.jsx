import React from "react";
import PropTypes from "prop-types";
import {Stateless} from "../stateless/stateless.jsx";

export const App = (props) => {
  const {namesPlaceCard} = props;

  return <Stateless
    namesPlace = {namesPlaceCard}
  />;
};

App.propTypes = {
  namesPlaceCard: PropTypes.arrayOf(PropTypes.string).isRequired,
};
