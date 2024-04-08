// "use client" specifies that this file should only be executed on the client side.
"use client";
// Importing hooks and components from React and other libraries.
import { useState } from "react";
import { useTransition, animated } from "@react-spring/web"; // For animations.
import Chat from "../components/chatbox"; // Custom component for the chat feature.
import Card from "../components/card-info"; // Component to display information cards.
import Prompt from "../components/input-prompt"; // Component for user input prompt.
import ModalHelp from "../components/help-modal"; // Component for the help modal.
// Importing images to be used on the cards.
import LucraT from "../../../public/lucra-text.png";
import LucraI from "../../../public/lucra-img.png";
import LucraH from "../../../public/lucra-help.png";
import "animate.css"; // CSS library for animations.

// Generate component contains the main UI logic and structure.
export default function Generate() {
  // States to control the visibility of chat and modal.
  const [active, setActive] = useState({ chat: false, modal: false });

  // Transition configuration for the chat using react-spring.
  const transitionChat = useTransition(active.chat, {
    from: { opacity: 0, transform: "translateY(-100%)" }, // Initial animation state.
    enter: { opacity: 1, transform: "translateY(0)" }, // Final (visible) state.
    leave: { opacity: 0, transform: "translateY(-100%)" }, // Exit animation state.
    config: { duration: 400 }, // Animation duration.
  });

  // Function to toggle the visibility of the modal.
  const toggleModal = () =>
    setActive((prev) => ({ ...prev, modal: !prev.modal }));
  // Function to activate the chat.
  const handleFocus = () => setActive((prev) => ({ ...prev, chat: true }));

  // JSX structure of the component.
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 lg:p-0 animate__animated animate__fadeIn">
      {active.modal && <ModalHelp onClose={toggleModal} />} /{/* / Renders the help
      modal if it is active. */}
      {transitionChat((style, item) =>
        item ? (
          // Animated container for the chat, visible when item is true.
          <animated.div
            style={style}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <Chat title="What do you want to generate?" />
          </animated.div>
        ) : (
          // Main section visible when the modal is not active.
          !active.modal && (
            <section className="flex flex-col items-center justify-center lg:gap-20 gap-16 mt-12">
              <p className="sm:text-3xl md:text-4xl lg:text-5xl text-4xl font-bold text-transparent bg-clip-text bg-text-gradient text-center">
                How can Lucra help you today?
              </p>
              <Prompt handleFocus={handleFocus} /> {/* // Component for the user
              input. */}
              <div className="flex gap-4 lg:flex-row sm:flex-row flex-col flex-wrap mb-12 lg:w-auto w-full">
                {/* Card components for different types of generation and help */}
                <Card
                  title="Text Generation"
                  image={LucraT}
                  alt="Lucra Text AI Model"
                />
                <Card
                  title="Image Generation (Oct, 2024)"
                  image={LucraI}
                  alt="Lucra Image AI Model"
                />
                <Card
                  title="Need Help?"
                  image={LucraH}
                  alt="Lucra Help AI Model"
                  classname="hover:bg-black/10 cursor-pointer"
                  modal={toggleModal}
                />
              </div>
            </section>
          )
        )
      )}
    </main>
  );
}
