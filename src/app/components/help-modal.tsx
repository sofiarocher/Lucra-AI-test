import { MouseEvent } from 'react';
import Image from 'next/image';
import ModalContent from './modal-info';
import Close from "../../../public/lucra-cross.svg"
import LucraH2 from "../../../public/lucra-help-2.png"
interface ModalHelpProps {
  onClose: () => void;
}

export default function ModalHelp({ onClose }: ModalHelpProps) {
    const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4" onClick={handleOutsideClick}>
        <div className="rounded-lg p-8 text-white/90 bg-gray-300/5 border-1 border-blue-300/30 text-center lg:w-2/3  w-auto relative sm:mx-20" onClick={(e) => e.stopPropagation()}>
            <Image src={Close} alt="Close Icon"  onClick={onClose} className='absolute right-4 top-4 opacity-70 w-4 lg:w-8'/>
            <h2 className='lg:text-4xl text-2xl font-bold text-transparent bg-clip-text bg-text-gradient'>How to use Lucra?</h2>
            <ModalContent 
              title="Reasons to use Lucra" 
              content="Lorem ipsum dolor sit, amet consectetur adipisicing elipsum dolor sit, amet consectetur adipisicing elit..it..ipsum dolor sit, amet consectetur adipisicing elit..." />
            <ModalContent 
              title="Home" 
              content="Lorem ipsum dolor sit, amet consectetur adipisipsum ipsum dolor sit, amet consectetur adipisicing elit..dolor sit, amet consectetur adipisicing elit..icing elit..." />
            <ModalContent 
              title="Prompt" 
              content="Lorem ipsum dolor sit, amet consectetur adipisicipipsum dolor sit, amet consectetur adipisicing elit..sum dolor sit, amet consectetur adipisicing elit..ing elit..." />
            <ModalContent 
              title="Text Generation" 
              content="Lorem ipsum dolor sit, amet consectetur adipisicingipsum dolor sit, amet consectetur adipisicing elit..ipsum dolor sit, amet consectetur adipisicing elit.. elit..." />
            <ModalContent 
              title="Image Generation" 
              content="Lorem ipsum dolor sit, amet consectetur adipisicing ipsum dolor sit, amet consectetur adipisicing"
              classname='pr-12' />
            <Image src={LucraH2} alt="Lucra AI Help Model" className='saturate-150 contrast-100 brightness-[90%] w-[80px] lg:w-[100px] absolute right-0 bottom-0'/>
        </div>
      </div>
    );
  }