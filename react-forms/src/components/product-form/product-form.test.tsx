//libs
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { vitest } from 'vitest';
import userEvent from '@testing-library/user-event';
//components
import { ProductForm } from '../index';
//contexts
import { ProductsContext } from '../../contexts/products/products.context';

describe('product form', () => {
  test('submitting the form with valid data should add a new product to the list', async () => {
    // mock the `setProducts` function
    const setProducts = vitest.fn();

    // render the form
    render(<ProductForm />, {
      wrapper: ({ children }) => (
        <ProductsContext.Provider value={{ setProducts, products: [] }}>
          {children}
        </ProductsContext.Provider>
      ),
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
    fireEvent.change(screen.getByLabelText(/image/i), {
      target: { files: [new File([''], 'product.png')] },
    });
    fireEvent.click(screen.getByText(/add product/i));

    // verify that the form is cleared
    expect(screen.getByLabelText(/product title/i)).toHaveValue('Product 1');
    expect(screen.getByLabelText(/price/i)).toHaveValue('10');
    expect(screen.getByLabelText(/discount/i)).toHaveValue('5');
    expect(screen.getByLabelText(/rating/i)).toHaveValue('4');
    expect(screen.getByLabelText(/Enter product produce date/i)).toHaveValue('1998-01-01');
    expect(screen.getByLabelText(/brand/i)).toHaveValue('Apple');
    expect(screen.getByLabelText(/category/i)).toHaveValue('Phone');

    const user = userEvent.setup();
    await user.click(screen.getByText(/add product/i));

    expect(screen.getByText(/product is added/i)).toBeInTheDocument();
  });
});
