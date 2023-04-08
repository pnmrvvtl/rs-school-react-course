//libs
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//components
import { Main } from '../index';

describe('Main component', () => {
  it('renders main component', () => {
    render(<Main />);
    const loadingElement = screen.getAllByTitle(/Loading/i);
    expect(loadingElement).toBeDefined();
  });
});
