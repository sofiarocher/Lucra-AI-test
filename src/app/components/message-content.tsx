import React from "react";

// Component for rendering message content with formatting
   export const MessageContent = ({ content }: { content: string }) => (
  <>
    {content.split("\n").map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ))}
  </>
);
