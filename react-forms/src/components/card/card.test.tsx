//libs
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//components
import { Card } from './card.component';
//types
import { Product } from '../../types/product.type';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  parameters: [
    ['description', 'This is a __tests__ product'],
    ['price', '9.99'],
    ['discount', '0'],
    ['rating', '4.5'],
  ],
  image: 'https://example.com/test-image-1.jpg',
};

describe('Card', () => {
  it('renders the product title and price', () => {
    render(<Card product={mockProduct} />);
    const titleElement = screen.getByText(/Test Product/i);
    const priceElement = screen.getByText(/Price/i);
    expect(titleElement).toBeDefined();
    expect(priceElement).toBeDefined();
  });
});

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Test Product',
    parameters: [
      ['description', 'This is a __tests__ product'],
      ['price', '9.99'],
      ['discount', '0'],
      ['rating', '4.5'],
    ],
    image: 'https://example.com/test-image-1.jpg',
  },
  {
    id: 2,
    title: 'Test Product',
    parameters: [
      ['description', 'This is a __tests__ product'],
      ['price', '9.99'],
      ['discount', '0'],
      ['rating', '4.5'],
    ],
    image: 'https://example.com/test-image-1.jpg',
  },
];

describe('Card', () => {
  it('renders a list of product cards', () => {
    render(
      <>
        {mockProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </>
    );
    const priceElements = screen.getAllByText(/Price/i);
    expect(priceElements.length).toBe(mockProducts.length);
  });
});
