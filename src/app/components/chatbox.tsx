"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Prompt from "./input-prompt";
import User from "../../../public/lucra-user.png"
import LucraU from "../../../public/lucra-user.png"

interface ChatProps {
    title: string;
}

interface Message {
  content: string;
  timestamp: string;
  sender: 'user' | 'ai';
}


export default function Chat({ title }: ChatProps) {
  const [promptValue, setPromptValue] = useState('');
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const handleRefresh = () => {
    setMessages([]); 
    localStorage.removeItem('messages'); 
  };

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleEnterClick = async () => {
          if (!promptValue.trim()) return;

          const newMessage: Message = {
            content: promptValue,
            timestamp: new Date().toISOString(),
            sender: 'user',
          };
      
          setMessages(messages => [...messages, newMessage]);
          setPromptValue("");

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
  
        setTimeout(() => {
          const aiResponse: Message = {
            content: response.text(),
            timestamp: new Date().toISOString(),
            sender: 'ai',
          };
          
          setMessages(messages => [...messages, aiResponse]);
        }, 1500);
      }

      return (
        <div className="flex flex-col items-center justify-center lg:p-24 sm:gap-8 gap-4 w-3/4 overflow-y-hidden">
          <p className="lg:text-4xl text-center text-2xl font-bold text-transparent bg-clip-text bg-text-gradient">{title}</p>
          <div className="h-2/3 w-full bg-gray-300/5 rounded-lg border-1 border-blue-300/10 overflow-y-auto scrollbar-thin scrollbar-thumb-black/80 scrollbar-track-black/10 scrollbar-rounded scroll-smooth">
            <div className="flex flex-col gap-2 p-4 text-sm">
              {messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()).map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'flex-col-reverse items-end' : 'flex-col items-start'}`}>
                  <div className={`${msg.sender === 'user' ? 'bg-blue-300/20' : 'bg-black/30'} rounded-lg px-4 py-2`}>
                    {msg.sender === 'ai' && (
                      <div className="flex items-center mb-2">
                        <Image src={LucraU} alt="Lucra AI" className="w-8 h-8 rounded-full" />
                        <span className="text-white ml-2 font-medium">Lucra</span>
                      </div>
                    )}
                    {msg.sender === 'user' && (
                      <div className="flex items-center justify-end mt-2">
                        <span className="text-white mr-2 font-medium">User</span>
                        <Image src={User} alt="User" className="w-8 h-8 rounded-full" />
                      </div>
                    )}
                    <p className="text-white">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Prompt promptValue={promptValue} setPromptValue={setPromptValue} click={handleEnterClick} refresh={handleRefresh}/>
        </div>
      )
}
