//libs
import React from 'react';
import ReactDOM from 'react-dom/client';
//redux
import store from './store/store.redux';
import { Provider } from 'react-redux';
//router
import { BrowserRouter } from 'react-router-dom';
//components
import App from './app';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
