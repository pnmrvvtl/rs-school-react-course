import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import App from '../src/app';

describe('App', () => {
  it('no found results on wrong query', async () => {
    const { getByPlaceholderText, getByDisplayValue } = render(<App />, { wrapper: BrowserRouter });

    const user = userEvent.setup();

    // verify page content for default route
    expect(getByPlaceholderText(/Enter your search query/i)).toBeInTheDocument();
    const inputElement = getByPlaceholderText(/Enter your search query/i);
    // verify page content for expected route after navigating
    fireEvent.change(inputElement, { target: { value: 'Here is no such a products' } });

    const searchButton = getByDisplayValue(/SEARCH/);

    expect(searchButton);
    await user.click(searchButton);
    setTimeout(
      () =>
        expect(
          screen.getByText(/Sorry we dont have products that match your search/i)
        ).toBeInTheDocument(),
      2000
    );
  });
});
