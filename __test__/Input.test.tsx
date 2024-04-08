import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Prompt from '@/app/components/input-prompt';

describe('Prompt component', () => {
    it('renders correctly', () => {
      render(<Prompt />);
  
      const inputElement = screen.getByPlaceholderText('Type your prompt here...');
      expect(inputElement).toBeInTheDocument();
  
      expect(inputElement).toHaveValue('');
  
      const deleteButton = screen.getByAltText('Delete');
      const enterButton = screen.getByAltText('Enter');
      expect(deleteButton).toBeInTheDocument();
      expect(enterButton).toBeInTheDocument();
    });
  
    it('handles click events correctly', () => {
      const clickMock = jest.fn();
      const refreshMock = jest.fn();
  
      render(<Prompt click={clickMock} refresh={refreshMock} />);
  
      const enterButton = screen.getByAltText('Enter');
      fireEvent.click(enterButton);
  
      expect(clickMock).toHaveBeenCalledTimes(1);
  
      const deleteButton = screen.getByAltText('Delete');
      fireEvent.click(deleteButton);
  
      expect(refreshMock).toHaveBeenCalledTimes(1);
    });
  });