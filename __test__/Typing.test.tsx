import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TypingAnimation } from '@/app/components/loader';

describe('TypingAnimation', () => {
    it('renders correctly', () => {
      render(<TypingAnimation />);
  
      const typingAnimationElement = screen.getByTestId('typing-animation');
      expect(typingAnimationElement).toBeInTheDocument();
      expect(typingAnimationElement).toHaveClass('typing-animation');
      expect(typingAnimationElement).toHaveClass('text-white/90');
      expect(typingAnimationElement).toHaveClass('font-bold');
  
      const dots = screen.getAllByText('.');
      expect(dots.length).toBe(3);
    });
  });