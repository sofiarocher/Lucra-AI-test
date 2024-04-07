"use client";

// Importing React functionalities and hooks
import React, { useEffect, useState, useRef } from "react";
// Importing Next.js Image component for optimized image handling
import Image from "next/image";
// Import custom components
import Prompt from "./input-prompt";
import Delete from "./delete-modal";
// Import UI utility from NextUI for modal handling
import { useDisclosure } from "@nextui-org/react";
// Import types for props validation
import { ChatProps, Message } from "../../../interfaces";

// Importing assets
import User from "../../../public/user-profile.png";
import LucraU from "../../../public/lucra-user.png";

// Chat component definition
export default function Chat({ title }: ChatProps) {
  // Modal control hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  // State for the input value
  const [promptValue, setPromptValue] = useState("");
  // Ref for scrolling behavior
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // State for AI processing indicator
  const [isAiThinking, setIsAiThinking] = useState(false);
  // State for existence of messages
  const [hasMessages, setHasMessages] = useState(true);
  // State for storing and displaying messages
  const [messages, setMessages] = useState<Message[]>(() => {
    // Retrieve stored messages from localStorage
    const savedMessages = localStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  // Effect for scrolling to the bottom of the chat when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Effect for persisting messages in localStorage
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  // Initial loading of messages from localStorage
  useEffect(() => {
    const messagesInStorage = localStorage.getItem("messages");
    const messagesArray = messagesInStorage
      ? JSON.parse(messagesInStorage)
      : [];
    setHasMessages(messagesArray.length > 0);
    setMessages(messagesArray);
  }, []);

  // Function to open delete confirmation modal
  const handleDeleteClick = () => {
    onOpen();
    setHasMessages(messages.length > 0);
  };

  // Function for scrolling chat window to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Animated typing indicator
  const TypingAnimation = () => (
    <div className="typing-animation text-white/90 font-bold">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );

  // Formatting response text (e.g., for displaying AI responses)
  const formatResponseText = (text: string) => {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "\n\n$1\n\n");
    formattedText = formattedText.replace(/(\n|^)\*(?=\s)/g, "\n* ");
    return formattedText;
  };

  // Component for rendering message content with formatting
  const MessageContent = ({ content }: { content: string }) => (
    <>
      {content.split("\n").map((line, index, array) => (
        <React.Fragment key={index}>
          {line}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );

  // Function to handle the 'Enter' key press or button click event in the chat interface
  const handleEnterClick = async () => {
    // Check if the promptValue is not just whitespace before proceeding
    if (!promptValue.trim()) return;

    // Construct a new message object from the user's input
    const newMessage: Message = {
      content: promptValue, // User's typed message
      timestamp: new Date().toISOString(), // Current timestamp in ISO format
      sender: "user", // Sender type set to user
    };

    // Add the new user message to the messages array
    setMessages((messages) => [...messages, newMessage]);
    // Reset the input field after sending the message
    setPromptValue("");

    // Dynamic import for Google's generative AI module within the function scope
    const {
      GoogleGenerativeAI,
      HarmCategory,
      HarmBlockThreshold,
    } = require("@google/generative-ai");

    // Constants for the AI model and API key
    const MODEL_NAME = "gemini-1.0-pro"; // AI model name
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // API key from environment variables

    // Initialize the Google Generative AI with the API key
    const genAI = new GoogleGenerativeAI(API_KEY);
    // Get the generative model with the specified model name
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Configuration for the AI generation
    const generationConfig = {
      temperature: 0.9, // Controls the randomness of the output
      topK: 1, // Limits the number of high-probability tokens considered at each step
      topP: 1, // Nucleus sampling: selects top tokens with cumulative probability of topP
      maxOutputTokens: 2048, // Maximum length of the generated output
    };

    // Safety settings to filter out harmful content
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

    // Start a chat session with the AI model
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [], // Initial chat history (empty for this example)
    });

    // Indicate that the AI is processing/thinking
    setIsAiThinking(true);

    // Send the user's message to the AI service and get the response
    const result = await chat.sendMessage(promptValue);
    const response = result.response;

    // Simulate a delay to mimic AI processing time (for UI purposes)
    setTimeout(() => {
      // Once the AI has 'responded', update the UI to show the AI's message
      setIsAiThinking(false);
      const aiResponse: Message = {
        content: formatResponseText(response.text()), // Format the AI's response text
        timestamp: new Date().toISOString(), // Current timestamp for the AI response
        sender: "ai", // Sender type set to AI
      };

      // Add the AI response to the messages array
      setMessages((messages) => [...messages, aiResponse]);
    }, 1000);
  };

  // Main rendering of chat component
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
                  <div ref={messagesEndRef} />
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
              </div>
            ))}
            {isAiThinking && <TypingAnimation />}
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
