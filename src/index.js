import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import dataOffers from './mocks/offers';
import {reducer, ActionCreator} from './reducer.js';

const init = () => {
  const store = createStore(reducer, {
    city: dataOffers[0] ? dataOffers[0].city : `No cities`,
  });

  store.dispatch(ActionCreator.addListOffers(dataOffers));

  const settings = {
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
