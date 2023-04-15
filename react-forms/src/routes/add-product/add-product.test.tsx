//libs
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
//components
import { AddProduct } from '../index';
//redux
import { Provider } from 'react-redux';
import store from '../../store/store.redux';

describe('AddProduct Route', () => {
  it('renders the add product page', () => {
    render(
      <Provider store={store}>
        <AddProduct />
      </Provider>
    );
    const titleElement = screen.getByText(/product title/i);
    const priceElement = screen.getByText(/price/i);
    const discountElement = screen.getByText(/discount/i);
    expect(titleElement).toBeDefined();
    expect(priceElement).toBeDefined();
    expect(discountElement).toBeDefined();
  });

  it('validation works', async () => {
    render(
      <Provider store={store}>
        <AddProduct />
      </Provider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText(/add product/i));
    const errorText = screen.getAllByText(/please input/i)[0];
    await waitFor(() => {
      expect(errorText).toBeVisible();
    });
    expect(errorText).toHaveStyle(`color: $font-color-error`);
  });
});
