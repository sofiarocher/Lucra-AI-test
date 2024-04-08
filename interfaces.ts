// Import types from 'next/image' and 'react' for use in type definitions
import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";

// Define the state and functions for managing chat activity
export interface ChatState {
  chatActive: boolean;
  setChatActive: Dispatch<SetStateAction<boolean>>;
}

// Define the state and functions for managing modal visibility
export interface ModalState {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

// Extend ModalState with functions for handling focus and modal actions
export interface MainContentProps extends ModalState {
  handleFocus: () => void;
  handleModal: () => void;
}

// Define properties for components managing chat transitions
export interface TransitionChatProps {
  chatActive: boolean;
}

// Define properties for a delete modal component
export type DeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hasMessages: boolean;
};

// Define properties for a card component, including optional classname and modal function
export interface CardProps {
  title: string;
  image: string | StaticImageData;
  alt: string;
  classname?: string;
  modal?: () => void;
}

// Define properties for displaying information, with an optional classname
export interface InfoProps {
  title: string;
  content: string;
  classname?: string;
}

// Define properties for a prompt component, including optional focus, classname, value, and action handlers
export type PromptProps = {
  handleFocus?: () => void;
  classname?: string;
  promptValue?: string;
  setPromptValue?: (value: string) => void;
  click?: () => void;
  refresh?: () => void;
};

// Define properties for a help modal component
export interface ModalHelpProps {
  onClose: () => void;
}

// Define properties for chat components
export interface ChatProps {
  title: string;
}

// Define the structure for a chat message object
export interface Message {
  content: string;
  timestamp: string;
  sender: "user" | "ai";
}
