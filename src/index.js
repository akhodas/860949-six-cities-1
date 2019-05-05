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
  };

  ReactDOM.render(
      <App
        placeCardNames = {settings.placeCardNames}
      />,
      document.querySelector(`#root`)
  );
};

init();
