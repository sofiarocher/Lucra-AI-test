import '@testing-library/jest-dom';
import {fireEvent, render, screen} from "@testing-library/react"
import Generate from "@/app/generate/page"

describe('Generate Component', () => {
    it('renders correctly', () => {
      render(<Generate />);
      expect(screen.getByText('How can Lucra help you today?')).toBeInTheDocument();
    });
  
    it('opens chat on button click', () => {
      render(<Generate />);
      const promptButton = screen.getByText('Your Button Text Here'); // Asume que tienes un botón o elemento interactivo para activar el chat
      fireEvent.click(promptButton);
      expect(screen.getByText('What do you want to generate?')).toBeInTheDocument();
    });
  
  });