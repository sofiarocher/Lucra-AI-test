"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Prompt from "./input-prompt";
import Delete from "./delete-modal";
import { useDisclosure } from "@nextui-org/react";
import { ChatProps, Message } from "../../../interfaces";
import { TypingAnimation } from "./loader";
import { MessageContent } from "./message-content";
import User from "../../../public/user-profile.png";
import LucraU from "../../../public/lucra-user.png";
import { generateAIResponse } from "../../../config";

// Chat component definition
export default function Chat({ title }: ChatProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [promptValue, setPromptValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [hasMessages, setHasMessages] = useState(true);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const messagesInStorage = localStorage.getItem("messages");
    const messagesArray = messagesInStorage
      ? JSON.parse(messagesInStorage)
      : [];
    setHasMessages(messagesArray.length > 0);
    setMessages(messagesArray);
  }, []);

  const handleDeleteClick = () => {
    onOpen();
    setHasMessages(messages.length > 0);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleEnterClick = async () => {
    if (!promptValue.trim()) return;
    setIsAiThinking(true)

    const newMessage: Message = {
      content: promptValue,
      timestamp: new Date().toISOString(),
      sender: "user",
    };

    setMessages((messages) => [...messages, newMessage]);
    setPromptValue("");

    try {
      const aiResponse = await generateAIResponse(promptValue);
      setMessages((messages: any) => [...messages, aiResponse]);
      setIsAiThinking(false);
    } catch (error) {
      console.error("Error occurred while generating AI response:", error);
      setIsAiThinking(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center lg:p-24 sm:gap-8 gap-4 w-3/4 overflow-y-hidden">
      <p className="lg:text-4xl text-center text-2xl font-bold text-transparent bg-clip-text bg-text-gradient">
        {title}
      </p>
      {messages.length > 0 && (
        <div className="h-2/3 w-full bg-gray-300/5 rounded-lg border-1 border-blue-300/10 overflow-y-auto scrollbar-thin scrollbar-thumb-black/80 scrollbar-track-black/10 scrollbar-rounded scroll-smooth">
          <div className="flex flex-col gap-2 p-4 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "flex-col-reverse items-end"
                    : "flex-col items-start"
                }`}
              >
                <div
                  className={`${
                    msg.sender === "user" ? "bg-blue-300/20" : "bg-black/30"
                  } rounded-lg px-4 py-2`}
                >
                  {msg.sender === "ai" && (
                    <div className="flex items-center mb-2">
                      <Image
                        src={LucraU}
                        alt="Lucra AI"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-white ml-2 font-medium">Lucra</span>
                    </div>
                  )}
                  {msg.sender === "user" && (
                    <div className="flex items-center justify-end mt-2">
                      <span className="text-white mr-2 font-medium">User</span>
                      <Image
                        src={User}
                        alt="User"
                        className="w-7 h-7 rounded-full"
                      />
                    </div>
                  )}
                  <p className="text-white">
                    <MessageContent content={msg.content} />
                  </p>
                </div>
                <div ref={messagesEndRef} />
              </div>
            ))}
            {isAiThinking && (
              <div className="flex flex-col items-start">
                <div className="bg-black/30 rounded-lg px-4 py-2">
                  <div className="flex items-center mb-2">
                    <Image
                      src={LucraU}
                      alt="Lucra AI"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white ml-2 font-medium">Lucra</span>
                  </div>
                  <TypingAnimation />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Prompt
        promptValue={promptValue}
        setPromptValue={setPromptValue}
        click={handleEnterClick}
        refresh={handleDeleteClick}
      />
      <Delete
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => {
          setMessages([]);
          localStorage.removeItem("messages");
          onClose();
        }}
        hasMessages={hasMessages}
      />
    </div>
  );
}
