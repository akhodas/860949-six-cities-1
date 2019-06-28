import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {compose} from 'recompose';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './components/app/app.jsx';
import {Operation as OperationData} from './reducer/data/data';
import reducer from './reducer/reducer';
import {createAPI} from './api';
import withStart from './hocs/with-start/with-start.js';
import ScrollToTop from './components/scrool-to-top/scroll-to-top.jsx';

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
      applyMiddleware(thunk.withExtraArgument(api))
  );
  const store = createStore(reducer, enhancer);

  store.dispatch(OperationData.loadOffers());

  const settings = {
    onClickTitleCard: (history, id) => {
      history.push(`/offer/${id}`);
    }
  };

  const AppWrapped = withStart(App);

  ReactDOM.render(
      <Provider store={store} >
        <BrowserRouter>
          <ScrollToTop>
            <AppWrapped
              {...settings}
            />
          </ScrollToTop>
        </BrowserRouter>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
