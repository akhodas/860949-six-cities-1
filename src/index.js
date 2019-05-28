import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import dataOffers from './mocks/offers';
import {reducer} from './reducer.js';

const init = () => {
  const store = createStore(reducer);

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
      <Provider store={store} >
        <App
          {...settings}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
