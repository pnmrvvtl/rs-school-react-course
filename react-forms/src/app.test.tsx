//libs
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
//components
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import App from './app';
import { Provider } from 'react-redux';
import store from './store/store.redux';

describe('App', () => {
  it('renders an error component when an invalid route is used', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/invalid-path']}>
        <App />
      </MemoryRouter>
    );

    const errorMessage = getByText(/Sorry, your page isn't found./i);
    expect(errorMessage).toBeDefined();
  });

  it('full app rendering/navigating', async () => {
    render(
      <Provider store={store}>
        <App />{' '}
      </Provider>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();

    // verify page content for default route
    expect(screen.getByText(/about/i)).toBeDefined();

    // verify page content for expected route after navigating
    await user.click(screen.getByText(/about/i));
    expect(screen.getByText(/Hi, my name is Vitalii Ponomarov/i)).toBeDefined();
  });
});
