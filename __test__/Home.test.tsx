import '@testing-library/jest-dom';
import {fireEvent, render, screen} from "@testing-library/react"
import Home from "@/app/page"

describe('Home Component', () => {
    it('renders welcome text and company name', () => {
      render(<Home />);
      expect(screen.getByText('Welcome to')).toBeInTheDocument();
      expect(screen.getByText('Lucra.AI')).toBeInTheDocument();
    });
  
    it('loads images correctly', () => {
        render(<Home />);
        expect(screen.getByAltText('Lucra.AI Logo')).toBeInTheDocument();
        expect(screen.getByAltText('Lucra.AI Model')).toBeInTheDocument();
        expect(screen.getByAltText('White Arrow')).toBeInTheDocument();
    });
  
    it('renders the generate button', () => {
      render(<Home />);
      expect(screen.getByRole('button', { name: 'Generate' })).toBeInTheDocument();
    });

    it('button works correctly', () => {
        render(<Home />);
        const button = screen.getByRole('button', { name: 'Generate' });
        fireEvent.click(button);
      });
    
});
