import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { ConnectedRouter } from 'connected-react-router';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

export const history = createHistory();
export const { store, persistor } = configureStore(history);

// Reset each page on change.
history.listen((location, action) => {
  window.scrollTo(0, 0);
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <HashRouter>
          <App/>
        </HashRouter>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();