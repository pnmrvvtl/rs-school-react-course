//libs
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
//components
import { ProductForm } from '../index';
//redux
import { Provider } from 'react-redux';
import store from '../../store/store.redux';

describe('product form', () => {
  test('submitting the form with valid data should add a new product to the list', async () => {
    // render the form
    render(<ProductForm />, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    // fill in the form inputs
    fireEvent.change(screen.getByLabelText(/product title/i), { target: { value: 'Product 1' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/discount/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/rating/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/Enter product produce date/i), {
      target: { value: '1998-01-01' },
    });
    fireEvent.click(screen.getByLabelText(/new/i));
    fireEvent.click(screen.getByLabelText(/brand/i), { target: { value: 'Apple' } });
    fireEvent.click(screen.getByLabelText(/category/i), { target: { value: 'Phone' } });
    fireEvent.click(screen.getByLabelText(/refurbished/i));
    fireEvent.change(screen.getByLabelText(/image/i), {
      target: { files: [new File([''], 'fav.png')] },
    });
    fireEvent.click(screen.getByText(/add product/i));
    expect(screen.getByText(/product - added/i)).toBeDefined();
  });
});
