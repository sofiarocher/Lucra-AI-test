import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import Logo from "../../public/lucra-logo.png";
import LucraH from "../../public/lucra-home.png";
import Arrow from "../../public/white-arrow.png";
import "animate.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center lg:p-24 relative animateanimated animatefadeIn">
      {/* Section for the welcome message and logo */}
      <section className="flex flex-col items-center justify-center mb-24">
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-text-gradient">
          <h1>Welcome to</h1>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Image src={Logo} alt="Lucra.AI Logo" />
            <span>Lucra.AI</span>
          </div>
        </div>
        {/* Link button to the 'Generate' page */}
        <Link href="/generate">
          <Button size="lg" variant="flat" className="mt-12 text-2xl">
            Generate
          </Button>
        </Link>
      </section>
      {/* Section for additional information and graphics at the bottom of the page */}
      <div className="text-white/70 absolute bottom-1 right-0">
        <p>Meet Lucra! Your AI Model</p>
        <Image src={Arrow} alt="White Arrow" />
        <Image src={LucraH} alt="Lucra.AI Model" />
      </div>
    </main>
  );
}