import Link from 'next/link';
import Image from "next/image";
import {Button} from "@nextui-org/react";
import Logo from "../../public/lucra-logo.png"
import LucraH from "../../public/lucra-home.png"
import Arrow from "../../public/white-arrow.png"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center lg:p-24 relative">
      <section className="flex flex-col items-center justify-center mb-24">
        <div className="sm:text-5xl md:text-6xl lg:text-7xl text-5xl font-bold text-transparent bg-clip-text bg-text-gradient">
          <h1>
            Welcome to
          </h1>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Image src={Logo} alt="Lucra.AI Logo" className="w-12 sm:w-16 md:w-20"/>
            <span>Lucra.AI</span>
          </div>
        </div>
        <Link href="/generate">
          <Button size="lg" radius="full" variant="flat" className="mt-12 text-2xl text-white/90 bg-gray-300/5 border-1 border-blue-300/30">
            Generate
          </Button>
        </Link>
      </section>
      <div className="flex flex-col items-center text-center text-white/70 absolute bottom-1 right-0">
        <p className="text-sm md:text-lg lg:text-xl relative lg:right-28 right-[35%] ">Meet Lucra! <br /> Your AI Model</p>
        <div className="opacity-40 absolute lg:bottom-50 bottom-[60%]">
          <Image src={Arrow} alt="White Arrow" width={120}/>
        </div>
        <div>
          <Image src={LucraH} alt="Lucra.AI Model" className="saturate-200 contrast-100 brightness-[90%] lg:w-80 w-52"/>
        </div>
      </div>
    </main>
  );
}
