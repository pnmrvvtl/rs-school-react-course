//libs
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//components
import App from '../../app';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('no found results on wrong query', async () => {
    const { getByPlaceholderText, getByDisplayValue } = render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    expect(getByPlaceholderText(/Enter your search query/i)).toBeInTheDocument();
    const inputElement = getByPlaceholderText(/Enter your search query/i);
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
