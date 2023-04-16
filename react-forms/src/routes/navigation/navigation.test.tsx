//libs
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//components
import { Navigation } from '../index';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Navigation', () => {
  it('renders the navigation', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    );
    const aboutElement = screen.getByText(/main/i);
    const mainElement = screen.getByText(/about/i);
    expect(aboutElement).toBeDefined();
    expect(mainElement).toBeDefined();
  });
});
