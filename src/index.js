import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {compose} from 'recompose';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import dataOffers from './mocks/offers';
import {ActionCreator, Operation, reducer} from './reducer.js';
import {createAPI} from './api';

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );

  store.dispatch(Operation.loadQuestions());
  // store.dispatch(ActionCreator.addListOffers(dataOffers));

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
