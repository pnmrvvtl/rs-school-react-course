//libs
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//components
import { AddProduct } from '../index';

describe('AddProduct Route', () => {
  it('renders the add product page', () => {
    render(<AddProduct />);
    const titleElement = screen.getByText(/product title/i);
    const priceElement = screen.getByText(/price/i);
    const discountElement = screen.getByText(/discount/i);
    expect(titleElement).toBeDefined();
    expect(priceElement).toBeDefined();
    expect(discountElement).toBeDefined();
  });

  it('validation works', async () => {
    render(<AddProduct />);
    const user = userEvent.setup();
    await user.click(screen.getByText(/add product/i));
    expect(screen.getAllByText(/please enter/i)[0]).toHaveStyle(`color: $font-color-error`);
  });
});
