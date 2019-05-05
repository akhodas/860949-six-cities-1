import React from "react";
import PropTypes from "prop-types";
import {Stateless} from "../stateless/stateless.jsx";

export const App = (props) => {
  const {placeCardNames} = props;

  return <Stateless
    placeNames = {placeCardNames}
  />;
};

App.propTypes = {
  placeCardNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
