import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {compose} from 'recompose';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
// import dataOffers from './mocks/offers';
import {ActionCreator, Operation} from './reducer/data/data';
import reducer from './reducer/index';
import {createAPI} from './api';

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
      applyMiddleware(thunk.withExtraArgument(api))
  );
  const store = createStore(reducer, enhancer);

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
