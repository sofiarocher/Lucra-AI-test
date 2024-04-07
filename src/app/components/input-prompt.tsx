// Directive to ensure this file runs only on the client side, not during server-side rendering.
"use client";

// Importing components and assets.
import { Input } from "@nextui-org/react"; // NextUI Input component for handling user input.
import Image from "next/image"; // Next.js Image component for optimized image rendering.
import Enter from "../../../public/lucra-enter.svg"; // Enter icon asset.
import Delete from "../../../public/lucra-delete.svg"; // Delete icon asset.
import { PromptProps } from "../../../interfaces"; // Type definitions for the props.

// Prompt functional component definition with default prop values and destructuring from PromptProps.
export default function Prompt({
  handleFocus = () => {}, // Default function for onFocus event if not provided.
  classname = "", // Default classname if not provided, to avoid undefined classes.
  promptValue = "", // Default value for the input field.
  setPromptValue = () => {}, // Default function to update the prompt value.
  click = () => {}, // Default function when the enter key or enter icon is clicked.
  refresh = () => {}, // Default function to refresh or delete the content when the delete icon is clicked.
}: PromptProps) {
  // Function to handle the Enter key press event.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      click(); // Trigger the click action when Enter key is pressed.
    }
  };

  // Component's JSX to be rendered.
  return (
    <div className={`flex w-full mb-6 md:mb-0 gap-4 ${classname}`}>
      <Input
        type="text"
        variant="faded" // Style variant of the input field.
        radius="md" // Border radius of the input field.
        size="lg" // Size of the input field.
        placeholder="Type your prompt here..." // Placeholder text in the input field.
        value={promptValue} // Controlled value of the input field.
        onChange={(e) => setPromptValue(e.target.value)} // Handler to update the prompt value on change.
        onFocus={handleFocus} // Handler to focus the input field.
        onKeyDown={handleKeyDown} // Handler for key press events in the input field.
        endContent={
          // Content at the end of the input field, for delete and enter icons.
          <div className="flex items-center text-white cursor-pointer">
            <Image
              src={Delete}
              alt="Delete"
              className="opacity-90 lg:w-[24px] w-[20px] mr-4"
              onClick={refresh} // Click handler for the delete icon.
            />
            <Image
              src={Enter}
              alt="Enter"
              className="opacity-90 lg:w-[28px] w-[24px]"
              onClick={click} // Click handler for the enter icon.
            />
          </div>
        }
        classNames={{
          // Custom class names for styling the input field.
          label: "text-white/90",
          input:
            "bg-black/5 text-white/90 placeholder:text-white/40 placeholder:text-sm placeholder:lg:text-xl text-xl",
          innerWrapper: "bg-transparent",
          inputWrapper:
            "bg-transparent dark:bg-black/60 backdrop-blur-lg !cursor-text border-1 border-blue-300 border-opacity-30",
        }}
      />
    </div>
  );
}
