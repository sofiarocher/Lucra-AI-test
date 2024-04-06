"use client"

import { useRef } from "react";
import {Input} from "@nextui-org/react";
import Image from "next/image";
import Clip from "../../../public/lucra-clip.svg"
import Enter from "../../../public/lucra-enter.svg"

type PromptProps = {
  handleFocus?: () => void;
  classname?: string;
  inputValue?: any;
  setInputValue?: any;
  click?: () => void;
};

export default function Prompt({ handleFocus, classname, inputValue, click, setInputValue}: PromptProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      click
    }
  };

  return (
    <div className={`flex w-full mb-6 md:mb-0 gap-4 ${classname}`}>
      <Input
        type="text"
        variant="faded"
        radius="md"
        size="lg"
        placeholder="Type your prompt here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        startContent={
          <div className="flex items-center text-white" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <Image src={Clip} alt="Clip" className="opacity-90 lg:w-[24px] w-[20px]" />
            <input type="file" ref={fileInputRef} className="hidden" />
          </div>
        }
        endContent={
          <div className="flex items-center text-white" onClick={click} style={{ cursor: 'pointer' }}>
            <Image src={Enter} alt="Enter" className="opacity-90 lg:w-[28px] w-[24px]" />
          </div>
        }
        classNames={{
          label: "text-white/90",
          input: [
            "bg-black/5",
            "text-white/90",
            "placeholder:text-white/40",
            "placeholder:text-sm",
            "placeholder:lg:text-xl",
            "text-xl"
          ],
          innerWrapper: [
            "bg-transparent",
          ],
          inputWrapper: [
            "bg-transparent",
            "dark:bg-black/60",
            "backdrop-blur-lg",
            "!cursor-text",
            "border-1",
            "border-blue-300",
            "border-opacity-30",
          ],
        }}
      />
    </div>
  );
}
