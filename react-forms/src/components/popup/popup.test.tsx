//libs
import React from 'react';
import { screen } from '@testing-library/dom';
import { act, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vitest } from 'vitest';
//types
import { ResultMeal } from '../../types/meal-api.type';
//components
import Popup from './popup.component';

describe('Popup', () => {
  const onCloseMock = vitest.fn();
  const onClickMock = vitest.fn();

  const selectedProductData: ResultMeal = {
    id: 123,
    title: 'Test Meal',
    image: 'https://test.image.com',
    readyInMinutes: 30,
    pricePerServing: 5,
    aggregateLikes: 50,
    vegetarian: false,
    summary: '<p>This is a test summary</p>',
    extendedIngredients: [
      {
        id: 1,
        name: 'Test Ingredient',
        amount: 1,
        image: '',
        aisle: '',
        consistency: '',
        meta: ['asd'],
        nameClean: '',
        measures: {
          metric: { amount: 1, unitLong: '', unitShort: '' },
          us: { unitLong: '', unitShort: '', amount: 1 },
        },
        original: '',
        originalName: '',
        unit: '',
      },
    ],
  };

  afterEach(() => {
    onCloseMock.mockReset();
    onClickMock.mockReset();
  });

  it('renders the Popup with selectedProductData', () => {
    act(() => {
      render(
        <Popup
          onCloseButtonClick={onCloseMock}
          onPopupClick={onClickMock}
          selectedProductData={selectedProductData}
        />
      );
    });

    expect(screen.getByText('Product Details')).toBeDefined();
    expect(screen.getByAltText('Test Meal')).toBeDefined();
    expect(screen.getByText('This is a test summary')).toBeDefined();
  });

  it('renders the Popup without selectedProductData', () => {
    act(() => {
      render(
        <Popup
          onCloseButtonClick={onCloseMock}
          onPopupClick={onClickMock}
          selectedProductData={null}
        />
      );
    });

    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('calls onCloseButtonClick when the close button is clicked', () => {
    act(() => {
      render(
        <Popup
          onCloseButtonClick={onCloseMock}
          onPopupClick={onClickMock}
          selectedProductData={selectedProductData}
        />
      );
    });

    const closeButton = screen.getByText('X');
    act(() => {
      closeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onCloseMock).toHaveBeenCalled();
  });
});
