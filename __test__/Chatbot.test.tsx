import '@testing-library/jest-dom';
import { render, screen, fireEvent} from '@testing-library/react';
import Chat from '@/app/components/chatbox';

describe('Chat Component', () => {
  it('renders the Chat component correctly', () => {
    render(<Chat title="What do you want to generate?" />);
    expect(screen.getByText('What do you want to generate?')).toBeInTheDocument();
  })
  
  it('sends a message when enter is pressed', () => {
    render(<Chat title="What do you want to generate?" />);
    const inputElement = screen.getByPlaceholderText('Type your prompt here...');
    fireEvent.change(inputElement, { target: { value: 'Hello' } });
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter' });
  });
  
  it('shows an alert if the input is empty and send is attempted', () => {
    render(<Chat title="What do you want to generate?" />);
    const sendButton = screen.getByTestId('sendButton');
    fireEvent.click(sendButton);
    expect(screen.getByText("This input can't be empty.")).toBeInTheDocument();
  });

})
