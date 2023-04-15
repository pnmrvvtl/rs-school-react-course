//libs
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, expect, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
//components
import { Main } from '../index';
import { Provider } from 'react-redux';
//redux
import store from '../../store/store.redux';

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

const server = setupServer(
  rest.get(
    'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
    (req, res, ctx) => {
      return res(
        ctx.json({
          results: [
            {
              id: 1,
              title: 'Spaghetti Carbonara',
              image: 'https://spoonacular.com/recipeImages/715594-312x231.jpg',
              readyInMinutes: 25,
              pricePerServing: 2.5,
              aggregateLikes: 200,
              vegetarian: false,
            },
          ],
        })
      );
    }
  ),
  rest.get(
    'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/1/information',
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: 1,
          title: 'Spaghetti Carbonara',
          image: 'https://spoonacular.com/recipeImages/715594-312x231.jpg',
          readyInMinutes: 25,
          pricePerServing: 2.5,
          aggregateLikes: 200,
          vegetarian: false,
          extendedIngredients: [{ name: 'eggs' }],
          summary:
            'Cook spaghetti. Fry bacon. Mix eggs and parmesan cheese. Combine everything and serve.',
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Main component', () => {
  it('renders the component', async () => {
    render(
      <TestWrapper>
        <Main />
      </TestWrapper>
    );

    expect(await screen.findByText('Spaghetti Carbonara')).toBeDefined();
  });

  it('renders popup when a card is clicked', async () => {
    render(
      <TestWrapper>
        <Main />
      </TestWrapper>
    );
    fireEvent.click(await screen.findByText('Spaghetti Carbonara'));
    await waitFor(() => expect(screen.getByText(/Mix eggs/i)).toBeVisible());
  });
});
