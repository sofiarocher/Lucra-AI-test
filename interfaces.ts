import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";

export interface ChatState {
  chatActive: boolean;
  setChatActive: Dispatch<SetStateAction<boolean>>;
}

export interface ModalState {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export interface MainContentProps extends ModalState {
  handleFocus: () => void;
  handleModal: () => void;
}

export interface TransitionChatProps {
  chatActive: boolean;
}

export type DeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hasMessages: boolean;
};

export interface CardProps {
  title: string;
  image: string | StaticImageData;
  alt: string;
  classname?: string;
  modal?: () => void;
}

export interface InfoProps {
  title: string;
  content: string;
  classname?: string;
}

export type PromptProps = {
  handleFocus?: () => void;
  classname?: string;
  promptValue?: string;
  setPromptValue?: (value: string) => void;
  click?: () => void;
  refresh?: () => void;
};

export interface ModalHelpProps {
  onClose: () => void;
}

export interface ChatProps {
  title: string;
}

export interface Message {
  content: string;
  timestamp: string;
  sender: "user" | "ai";
}