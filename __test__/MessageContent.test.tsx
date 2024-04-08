import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MessageContent } from '@/app/components/message-content';

describe('MessageContent component', () => {
    it('renders message content correctly without line breaks', () => {
    const content = "Single line message";
    render(<MessageContent content={content} />);

    const renderedLine = screen.getByText(content);
    expect(renderedLine).toBeInTheDocument();

    const lineBreaks = screen.queryAllByText("\n");
    expect(lineBreaks.length).toBe(0); // No line breaks should be rendered
  });

  it('renders content with special characters correctly', () => {
    const content = "Special characters: !@#$%^&*()";
    render(<MessageContent content={content} />);

    const renderedLine = screen.getByText(content);
    expect(renderedLine).toBeInTheDocument();
  });

  it('renders content with HTML tags correctly', () => {
    const content = "<div><p>HTML content</p></div>";
    render(<MessageContent content={content} />);

    // Verify that HTML tags are escaped and rendered as text
    const renderedContent = screen.getByText(content);
    expect(renderedContent).toBeInTheDocument();
  });

  it('renders content with escaped characters correctly', () => {
    const content = "&lt;div&gt;Escaped content&lt;/div&gt;";
    render(<MessageContent content={content} />);

    // Verify that escaped characters are rendered correctly
    const renderedContent = screen.getByText(content);
    expect(renderedContent).toBeInTheDocument();
  });
});
