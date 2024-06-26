"use client";

// Importing components and assets.
import { Input } from "@nextui-org/react"; 
import Image from "next/image"; 
import Enter from "../../../public/lucra-enter.svg"; 
import Delete from "../../../public/lucra-delete.svg"; 
import { PromptProps } from "../../../interfaces"; 

// Prompt functional component definition with default prop values and destructuring from PromptProps.
export default function Prompt({
  handleFocus = () => {}, 
  classname = "",
  promptValue = "", 
  setPromptValue = () => {}, 
  click = () => {}, 
  refresh = () => {},
}: PromptProps) {

  // Function to handle the Enter key press event.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      click(); 
    }
  };

  // Component's JSX to be rendered.
  return (
    <div className={`flex w-full mb-6 md:mb-0 gap-4 ${classname}`}>
      <Input
        type="text"
        variant="faded" 
        radius="md" 
        size="lg" 
        placeholder="Type your prompt here..." 
        value={promptValue} 
        onChange={(e) => setPromptValue(e.target.value)} 
        onFocus={handleFocus} 
        onKeyDown={handleKeyDown} 
        endContent={
          <div className="flex items-center text-white cursor-pointer">
            <Image
              src={Delete}
              alt="Delete"
              className="opacity-90 lg:w-[24px] w-[20px] mr-4"
              onClick={refresh} 
            />
            <Image
              src={Enter}
              alt="Enter"
              className="opacity-90 lg:w-[28px] w-[24px]"
              data-testid="sendButton"
              onClick={click} 
            />
          </div>
        }
        classNames={{
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
