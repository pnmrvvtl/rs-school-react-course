//libs
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React, { useState } from 'react';
//contexts
import { SearchContext } from '../../contexts/search/search.context';
//components
import { Main } from '../index';

function TestWrapper({ children }: { children: React.ReactNode }) {
  const [searchString, setSearchString] = useState('');

  return (
    <SearchContext.Provider value={{ searchString, setSearchString }}>
      {children}
    </SearchContext.Provider>
  );
}

const server = setupServer(
  rest.get(
    'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            {
              id: 1,
              title: 'Meal 1',
              image: 'https://www.image1.com',
              readyInMinutes: 10,
              pricePerServing: 5,
              aggregateLikes: 100,
              vegetarian: true,
            },
            {
              id: 2,
              title: 'Meal 2',
              image: 'https://www.image2.com',
              readyInMinutes: 20,
              pricePerServing: 10,
              aggregateLikes: 200,
              vegetarian: false,
            },
          ],
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('renders the component', async () => {
  render(
    <TestWrapper>
      <Main />
    </TestWrapper>
  );

  expect(await screen.findByText('Meal 1')).toBeDefined();
  expect(await screen.findByText('Meal 2')).toBeDefined();
});
