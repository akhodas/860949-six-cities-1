import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import dataOffers from "./mocks/offers";

const init = () => {
  const settings = {
    offers: dataOffers,
    clickOnTitleCard: (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-console
      console.log(`CLICK on title card: "${e.target.text}"`);
    },
  };

  ReactDOM.render(
      <App
        placeCardNames = {settings.placeCardNames}
        clickOnTitleCard = {settings.clickOnTitleCard}
      />,
      document.querySelector(`#root`)
  );
};

init();
