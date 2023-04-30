//libs
import React from 'react';
//ssr routing
import { StaticRouter } from 'react-router-dom/server';
//ssr
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';
//redux
import { Provider } from 'react-redux';
import store from './store/store.redux.js';
//components
import App from './app.js';

export const render = (
  url: string | Partial<Location>,
  options?: RenderToPipeableStreamOptions | undefined
) => {
  return renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
    options
  );
};
