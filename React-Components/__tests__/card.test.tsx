//libs
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//components
import { Card } from '../src/components/';
//types
import { Product } from '../src/types/product.type';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'This is a __tests__ product',
  price: 9.99,
  discountPercentage: 0,
  rating: 4.5,
  stock: 10,
  brand: 'Test Brand',
  category: 'Test Category',
  thumbnail: 'https://example.com/test-thumbnail.jpg',
  images: [
    'https://example.com/test-image-1.jpg',
    'https://example.com/test-image-2.jpg',
    'https://example.com/test-image-3.jpg',
  ],
};

describe('Card', () => {
  it('renders the product title and price', () => {
    render(<Card product={mockProduct} />);
    const titleElement = screen.getByText(/Test Product/i);
    const priceElement = screen.getByText(/Price:/i);
    expect(titleElement).toBeDefined();
    expect(priceElement).toBeDefined();
  });
});

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Test Product 1',
    description: 'This is a __tests__ product',
    price: 9.99,
    discountPercentage: 0,
    rating: 4.5,
    stock: 10,
    brand: 'Test Brand',
    category: 'Test Category',
    thumbnail: 'https://example.com/test-thumbnail-1.jpg',
    images: [
      'https://example.com/test-image-1-1.jpg',
      'https://example.com/test-image-1-2.jpg',
      'https://example.com/test-image-1-3.jpg',
    ],
  },
  {
    id: 2,
    title: 'Test Product 2',
    description: 'This is a __tests__ product',
    price: 19.99,
    discountPercentage: 10,
    rating: 4.0,
    stock: 5,
    brand: 'Test Brand',
    category: 'Test Category',
    thumbnail: 'https://example.com/test-thumbnail-2.jpg',
    images: [
      'https://example.com/test-image-2-1.jpg',
      'https://example.com/test-image-2-2.jpg',
      'https://example.com/test-image-2-3.jpg',
    ],
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
    const priceElements = screen.getAllByText(/Price:/i);
    expect(priceElements.length).toBe(mockProducts.length);
  });
});
