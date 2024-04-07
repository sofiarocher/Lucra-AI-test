"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Prompt from "./input-prompt";
import User from "../../../public/user-profile.png";
import LucraU from "../../../public/lucra-user.png";
import { useDisclosure } from "@nextui-org/react";
import Delete from "./delete-modal";

interface ChatProps {
  title: string;
}

interface Message {
  content: string;
  timestamp: string;
  sender: "user" | "ai";
}

export default function Chat({ title }: ChatProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [promptValue, setPromptValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [hasMessages, setHasMessages] = useState(true);
  const [apiError, setApiError] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  useEffect(() => {
    const messagesInStorage = localStorage.getItem("messages");
    const messagesArray = messagesInStorage
      ? JSON.parse(messagesInStorage)
      : [];
    setHasMessages(messagesArray.length > 0);
    setMessages(messagesArray);
  }, []);

  const handleDeleteClick = () => {
    const hasMessagesInChat = messages.length > 0;
    setHasMessages(hasMessagesInChat); // Actualiza el estado hasMessages basado en si hay mensajes
    onOpen(); // Abre el modal independientemente, pero el contenido interno cambiará basado en hasMessages
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handleEnterClick = async () => {
    if (!promptValue.trim()) return;

    setApiError(""); // Limpiar errores anteriores

    const newMessage: Message = {
      // Define newMessage fuera de try para poder acceder después
      content: promptValue,
      timestamp: new Date().toISOString(),
      sender: "user",
    };

    try {
      setMessages((messages) => [...messages, newMessage]);
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
        // otros settings
      ];

      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      setIsAiThinking(true);

      const result = await chat.sendMessage(promptValue);
      const response = result.response;

      setTimeout(() => {
        setIsAiThinking(false);
        const aiResponse: Message = {
          content: formatResponseText(response.text()),
          timestamp: new Date().toISOString(),
          sender: "ai",
        };

        setMessages((messages) => [...messages, aiResponse]);
      }, 1000);
    } catch (error) {
      setIsAiThinking(false);
      setApiError("Error al procesar la solicitud. Inténtalo de nuevo.");
      console.error("API call error:", error);
    }
  };

  const TypingAnimation = () => {
    return (
      <div className="typing-animation text-white/90 font-bold">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    );
  };

  const formatResponseText = (text: string) => {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "\n\n$1\n\n");
    formattedText = formattedText.replace(/(\n|^)\*(?=\s)/g, "\n* ");

    return formattedText;
  };

  const MessageContent = ({ content }: { content: string }) => {
    return (
      <>
        {content.split("\n").map((line: string, index: any, array: any) => (
          <React.Fragment key={index}>
            {line}
            {index < array.length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center lg:p-24 sm:gap-8 gap-4 w-3/4 overflow-y-hidden">
      <p className="lg:text-4xl text-center text-2xl font-bold text-transparent bg-clip-text bg-text-gradient">
        {title}
      </p>

      {messages.length > 0 && (
        <div className="h-2/3 w-full bg-gray-300/5 rounded-lg border-1 border-blue-300/10 overflow-y-auto scrollbar-thin scrollbar-thumb-black/80 scrollbar-track-black/10 scrollbar-rounded scroll-smooth">
          <div className="flex flex-col gap-2 p-4 text-sm">
            {messages
              .sort(
                (a, b) =>
                  new Date(a.timestamp).getTime() -
                  new Date(b.timestamp).getTime()
              )
              .map((msg, index) => (
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
                    <div ref={messagesEndRef} />
                    {msg.sender === "ai" && (
                      <div className="flex items-center mb-2">
                        <Image
                          src={LucraU}
                          alt="Lucra AI"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-white ml-2 font-medium">
                          Lucra
                        </span>
                      </div>
                    )}
                    {msg.sender === "user" && (
                      <div className="flex items-center justify-end mt-2">
                        <span className="text-white mr-2 font-medium">
                          User
                        </span>
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
