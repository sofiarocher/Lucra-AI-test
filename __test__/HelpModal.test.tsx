import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalHelp from '@/app/components/help-modal';

describe('ModalHelp component', () => {
  it('renders correctly with modal contents', () => {
    // Mock onClose function
    const onCloseMock = jest.fn();

    // Render the component
    render(<ModalHelp onClose={onCloseMock} />);

    // Verify that the modal title is rendered
    const modalTitle = screen.getByText('How to use Lucra?');
    expect(modalTitle).toBeInTheDocument();

    // Verify that the close button is rendered and functional
    const closeButton = screen.getByAltText('Close Icon');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
