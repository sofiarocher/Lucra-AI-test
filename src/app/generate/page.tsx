"use client"

import Card from "../components/card-info"
import Prompt from "../components/input-prompt"
import ModalHelp from "../components/help-modal"
import LucraT from "../../../public/lucra-text.png"
import LucraI from "../../../public/lucra-img.png"
import LucraH from "../../../public/lucra-help.png"
import { useState } from "react"

export default function Generate() {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 lg:p-0">
      {openModal ? (
        <ModalHelp onClose={handleModal} />
      ) : (
        <section className="flex flex-col items-center justify-center lg:gap-40 gap-16 mt-12">
          <p className="sm:text-3xl md:text-4xl lg:text-5xl text-4xl font-bold text-transparent bg-clip-text bg-text-gradient text-center">
            How can Lucra help you today?
          </p>
          <Prompt />
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
      )}
    </main>
  );
}

