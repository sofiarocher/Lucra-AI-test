import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Delete from '@/app/components/delete-modal';

describe('Delete component', () => {
    it('renders correctly with messages', () => {
      render(<Delete isOpen={true} onClose={() => {}} onConfirm={() => {}} hasMessages={true} />);
  
      const confirmText = screen.getByText('Are you sure you want to delete the conversation?');
      expect(confirmText).toBeInTheDocument();
  
      const cancelButton = screen.getByText('Cancel');
      const deleteButton = screen.getByText('Delete');
      expect(cancelButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });
  
    it('renders correctly without messages', () => {
      render(<Delete isOpen={true} onClose={() => {}} onConfirm={() => {}} hasMessages={false} />);
  
      const noMessagesText = screen.getByText('Nothing to delete.');
      expect(noMessagesText).toBeInTheDocument();
  
      const cancelButton = screen.getByText('Cancel');
      expect(cancelButton).toBeInTheDocument();
  
      const deleteButton = screen.queryByText('Delete');
      expect(deleteButton).toBeNull(); 
    });
  
    it('calls onClose when Cancel button is clicked', () => {
      const onCloseMock = jest.fn();
  
      render(<Delete isOpen={true} onClose={onCloseMock} onConfirm={() => {}} hasMessages={true} />);
  
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
  
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  
  });