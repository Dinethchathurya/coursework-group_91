import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';  // For additional matchers
import Greet from '../components/Testcomp';
import React from 'react';
import '@testing-library/jest-dom';

describe('Greet Component', () => {
  test('renders hello message when name is provided', () => {
    render(<Greet name="Sadewni" />);
    
    // Check if the greeting message is displayed
    const greetingElement = screen.getByText('Hello Sadewni');
    expect(greetingElement).toBeInTheDocument();
  });

  test('renders login button when name is not provided', () => {
    render(<Greet />);
    
    // Check if the Login button is displayed
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
  });
});
