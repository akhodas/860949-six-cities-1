import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";

const init = () => {
  const settings = {
    placeCardNames: [
      `Beautiful & luxurious apartment at great location`,
      `Wood and stone place`,
      `Canal View Prinsengracht`,
      `Nice, cozy, warm big bed apartment`,
    ],
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
