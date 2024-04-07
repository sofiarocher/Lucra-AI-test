"use client"

import {Input} from "@nextui-org/react";
import Image from "next/image";
import Enter from "../../../public/lucra-enter.svg"
import Refresh from "../../../public/lucra-refresh.svg"

type PromptProps = {
  handleFocus?: () => void;
  classname?: string;
  promptValue?: any;
  setPromptValue?: any;
  click?: () => void;
  refresh?: () => void;
};

export default function Prompt({ handleFocus, classname, promptValue, click, setPromptValue, refresh}: PromptProps) {
  
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
        value={promptValue}
        onChange={(e) => setPromptValue(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        endContent={
          <div className="flex items-center text-white" style={{ cursor: 'pointer' }}>
            <Image src={Refresh} alt="Refresh" className="opacity-90 lg:w-[24px] w-[20px] mr-4" onClick={refresh}/>
            <Image src={Enter} alt="Enter" className="opacity-90 lg:w-[28px] w-[24px]" onClick={click}/>
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
