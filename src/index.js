import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {compose} from 'recompose';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './components/app/app.jsx';
import {Operation as OperationData} from './reducer/data/data';
import {Operation as OperationUser} from './reducer/user/user';
import reducer from './reducer/reducer';
import {createAPI} from './api';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch.js';

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
      applyMiddleware(thunk.withExtraArgument(api))
  );
  const store = createStore(reducer, enhancer);

  store.dispatch(OperationUser.addUserData());
  store.dispatch(OperationData.loadOffers());

  const settings = {
    onClickTitleCard: (history, id) => {
      history.push(`/offer/${id}`);
      // eslint-disable-next-line no-console
      console.log(`CLICK on title card #${id}`);
    },
    onClickImageCard: (id) => {
      // eslint-disable-next-line no-console
      console.log(`CLICK on image card: "${id}"`);
    }
  };

  const AppWrapped = withScreenSwitch(App);

  ReactDOM.render(
      <Provider store={store} >
        <BrowserRouter>
          <AppWrapped
            {...settings}
          />
        </BrowserRouter>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
