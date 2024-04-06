import { MouseEvent } from 'react';
import ModalContent from './modal-info';
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
        <div className="rounded-lg p-8 text-white/90 bg-gray-300/5 border-1 border-blue-300/30 text-center w-1/3" onClick={(e) => e.stopPropagation()}>
            <h2 className='text-4xl font-bold text-transparent bg-clip-text bg-text-gradient'>How to use Lucra?</h2>
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
              content="Lorem ipsum dolor sit, amet consectetur adipisicingipsum dolor sit, amet consectetur adipisicing elit.. elit..." />
            <ModalContent 
              title="Image Generation" 
              content="Lorem ipsum dolor sit, amet consectetur adipisicing ipsum dolor sit, amet consectetur adipisicing elit..elit..." />
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }