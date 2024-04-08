import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Generate from "@/app/generate/page"

describe('Generate Component', () => {
    it('renders correctly', () => {
      render(<Generate />);
      expect(screen.getByText('How can Lucra help you today?')).toBeInTheDocument();
    });
  
    it('opens help modal', () => {
      render(<Generate />);
      const helpButton = screen.getByText('Need Help?');
      fireEvent.click(helpButton);
      expect(screen.getByText('How to use Lucra?')).toBeInTheDocument();
    });

    it('input is focused', async () => {
        render(<Generate />);
        const promptInput = screen.getByPlaceholderText('Type your prompt here...');
        fireEvent.focus(promptInput);
      });
  });