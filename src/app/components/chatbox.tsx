"use client"

import { useState } from "react";
import Image from "next/image";
import Prompt from "./input-prompt";
import Close from "../../../public/lucra-cross.svg"
import User from "../../../public/lucra-user.png"
import LucraU from "../../../public/lucra-user.png"

interface ChatProps {
    title: string;
    onclick?: () => void; 
}

export default function Chat({ title, onclick }: ChatProps) {
    const [promptValue, setPromptValue] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [dataValue, setDataValue] = useState("");

    const handleEnterClick = async () => {
        setPromptValue(inputValue);
        setInputValue("");

        const {
          GoogleGenerativeAI,
          HarmCategory,
          HarmBlockThreshold,
        } = require("@google/generative-ai");
    
        const MODEL_NAME = "gemini-1.0-pro";
        const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
        const generationConfig = {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        };
    
        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ];
    
        const chat = model.startChat({
          generationConfig,
          safetySettings,
          history: [],
        });
    
        const result = await chat.sendMessage(promptValue);
        const response = result.response;
        setDataValue(response.text())
      };
      
      console.log(dataValue)

    return (
        <div className="flex min-h-screen flex-col items-center justify-center lg:p-24 relative gap-20">
            <Image src={Close} alt="Close Icon" onClick={onclick} className="absolute right-0 top-20 opacity-30" />
            <p className="lg:text-4xl text-2xl font-bold text-transparent bg-clip-text bg-text-gradient">{title} </p>
            <div className="h-3/4 w-full bg-gray-300/5 rounded-lg border-1 border-blue-300/10 text-white/90">
                <div className="flex items-center font-medium justify-end p-4 text-sm">
                    <p className="pr-2">User</p>
                    <Image src={User} alt="User Profile Picture" className="w-8"/>
                </div>
                <div className="flex items-center font-medium justify-start p-4 text-sm">
                    <Image src={LucraU} alt="User Profile Picture" className="w-8"/>
                    <p className="pl-2">Lucra</p>
                </div>
            <p>{promptValue}</p>
            <p>{dataValue}</p>
            </div>
            
            <Prompt classname="" inputValue={inputValue} setInputValue={setInputValue} click={handleEnterClick}/>
        </div>
    )
}
