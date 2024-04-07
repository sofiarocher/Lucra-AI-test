// Import React and Next.js functionalities
import { MouseEvent } from "react";
import Image from "next/image";
// Import custom modal content component
import ModalContent from "./modal-info";
// Import image assets for the modal
import Close from "../../../public/lucra-cross.svg";
import LucraH2 from "../../../public/lucra-help-2.png";
// Import type definitions for props
import { ModalHelpProps } from "../../../interfaces";

// Predefined content for the modal displayed to the user
const modalContents = [
  {
    title: "Reasons to use Lucra",
    content:
      "This platform leverages the advanced OpenAI API to deliver smart, adaptive solutions. It enables task automation, creative content generation, and insights from large data sets, enhancing efficiency and innovation.",
  },
  {
    title: "Home",
    content:
      "The home page provides an overview of the available features and services. Users can easily access text and image generation tools and explore the various functionalities offered by the OpenAI API.",
  },
  {
    title: "Prompts",
    content:
      "Prompts allow interaction with the API by generating specific responses to user-inputted questions or phrases. This section facilitates the creation of personalized content and intuitive exploration of artificial intelligence.",
  },
  {
    title: "Text Generation",
    content:
      "Text generation uses artificial intelligence to create coherent and contextual written content. This tool is ideal for drafting articles, generating creative ideas, or building complex narratives automatically.",
  },
  {
    title: "Image Generation (Available in Oct, 2024)",
    content:
      "Image generation allows for the creation of unique visuals from textual descriptions, opening a spectrum of creative and design possibilities. This feature transforms words into detailed images, facilitating innovative graphic material creation.",
    classname: "pr-20",
  },
];

// Component for displaying a modal with helpful information
export default function ModalHelp({ onClose }: ModalHelpProps) {
  // Function to handle clicks outside the modal content, triggering the close function
  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose(); // Close the modal when the overlay is clicked
    }
  };

  // Render the modal layout with content
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4 animate__animated animate__fadeIn"
      onClick={handleOutsideClick}
    >
      <div
        className="rounded-lg p-8 text-white/90 bg-gray-300/5 border-1 border-blue-300/30 text-center lg:w-2/4 w-auto relative sm:mx-20"
        onClick={(e) => e.stopPropagation()} // Prevent event bubbling to avoid closing the modal when its content is clicked
      >
        <Image
          src={Close}
          alt="Close Icon"
          onClick={onClose} // Function to close the modal
          className="absolute right-4 top-4 opacity-70 w-4 lg:w-8 cursor-pointer"
        />
        <h2 className="lg:text-3xl text-2xl font-bold text-transparent bg-clip-text bg-text-gradient">
          How to use Lucra?
        </h2>
        {modalContents.map(({ title, content, classname }) => (
          <ModalContent
            key={title}
            title={title}
            content={content}
            classname={classname} // Additional styling for specific content
          />
        ))}
        <Image
          src={LucraH2}
          alt="Lucra AI Help Model"
          className="saturate-150 contrast-100 brightness-[90%] w-[80px] lg:w-[100px] absolute right-0 bottom-0"
        />
      </div>
    </div>
  );
}
