// Home.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Home from "@/app/page"; 
import { useRouter } from 'next/router';

// Asegúrate de que el mock esté devolviendo un objeto con todas las propiedades que utiliza useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    route: '/',
    pathname: '/',
    query: '',
    asPath: '',
  })),
}));

describe('Home Component', () => {
  test('renders correctly', () => {
    render(<Home/>);
    expect(screen.getByText('Welcome to')).toBeInTheDocument();
    expect(screen.getByText('Lucra.AI')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate' })).toBeInTheDocument();
  });

  test('navigates to /generate on button click', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<Home/>);
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    expect(push).toHaveBeenCalledWith('/generate');
  });
});
