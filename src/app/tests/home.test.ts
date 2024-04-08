// Home.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from "../page"; // Asegúrate de que 'Home' sea el nombre del componente default exportado desde 'page.tsx'.
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

// Mock useRouter con un tipo retornado que coincida con el tipo real de useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

describe('Home Component', () => {
  test('renders correctly', () => {
    render(Home);
    expect(screen.getByText('Welcome to')).toBeInTheDocument();
    expect(screen.getByText('Lucra.AI')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate' })).toBeInTheDocument();
  });

  test('navigates to /generate on button click', () => {
    // Mocking the 'push' function before the test
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(Home);
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    expect(push).toHaveBeenCalledWith('/generate');
  });
});
