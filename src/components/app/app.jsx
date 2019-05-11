import React from "react";
import PropTypes from "prop-types";
import MainPage from "../main-page/main-page.jsx";

const App = (props) => {
  const {placeCardNames, clickOnTitleCard} = props;

  return <MainPage
    placeNames = {placeCardNames}
    clickOnTitleCard = {clickOnTitleCard}
  />;
};

App.propTypes = {
  placeCardNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  clickOnTitleCard: PropTypes.func.isRequired,
};

export default App;
