import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';
import dataOffers from './mocks/offers';

const init = () => {
  const settings = {
    offers: dataOffers,
    clickOnTitleCard: (id) => {
      // eslint-disable-next-line no-console
      console.log(`CLICK on title card #${id}`);
    },
    clickOnImageCard: (id) => {
      // eslint-disable-next-line no-console
      console.log(`CLICK on image card: "${id}"`);
    }
  };

  ReactDOM.render(
      <App
        {...settings}
      />,
      document.querySelector(`#root`)
  );
};

init();
