"use client"

import { useState } from "react"
import { useTransition, animated } from '@react-spring/web';
import Chat from "../components/chatbox";
import Card from "../components/card-info"
import Prompt from "../components/input-prompt"
import ModalHelp from "../components/help-modal"
import LucraT from "../../../public/lucra-text.png"
import LucraI from "../../../public/lucra-img.png"
import LucraH from "../../../public/lucra-help.png"

export default function Generate() {
  const [chatActive, setChatActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const transitionChat = useTransition(chatActive, {
    from: { opacity: 0, transform: 'translateY(-100%)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-100%)' },
    config: {
      duration: 400, 
    },
  });

  const handleFocus = () => {
    setChatActive(true);
  };

  const handleCloseChat = () => {
    setChatActive(false);
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8 lg:p-0">
    {openModal && (
      <ModalHelp onClose={handleModal} />
    )}
    {transitionChat((style, item) =>
      item ? (
        <animated.div style={style} className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <Chat title="What do you want to generate?" onclick={handleCloseChat} />
        </animated.div>
      ) : (
        !openModal && (
          <section className="flex flex-col items-center justify-center lg:gap-40 gap-16 mt-12">
            <p className="sm:text-3xl md:text-4xl lg:text-5xl text-4xl font-bold text-transparent bg-clip-text bg-text-gradient text-center">
              How can Lucra help you today?
            </p>
            <Prompt handleFocus={handleFocus} />
            <div className="flex gap-4 lg:flex-row sm:flex-row flex-col flex-wrap mb-12 lg:w-auto w-full">
              <Card
                title="Text Generation"
                image={LucraT}
                alt="Lucra Text AI Model"
              />
              <Card
                title="Image Generation"
                image={LucraI}
                alt="Lucra Image AI Model"
              />
              <Card
                title="Need Help?"
                image={LucraH}
                alt="Lucra Help AI Model"
                classname="hover:bg-black/10 cursor-pointer"
                modal={handleModal}
              />
            </div>
          </section>
        )
    ))}
  </main>
  )
}

