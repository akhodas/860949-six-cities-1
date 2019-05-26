import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';

import App from './components/app/app.jsx';
import dataOffers from './mocks/offers';

const init = () => {
  const settings = {
    offers: dataOffers,
    onClickTitleCard: (id) => {
      // eslint-disable-next-line no-console
      console.log(`CLICK on title card #${id}`);
    },
    onClickImageCard: (id) => {
      // eslint-disable-next-line no-console
      console.log(`CLICK on image card: "${id}"`);
    }
  };

  ReactDOM.render(
      <App
        {...settings}
        leaflet={leaflet}
      />,
      document.querySelector(`#root`)
  );
};

init();
