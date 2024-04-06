import { MouseEvent } from 'react';

interface ModalHelpProps {
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function ModalHelp({ onClose }: ModalHelpProps) {
    
    const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={handleOutsideClick}>
        <div className="bg-white rounded-lg p-8" onClick={(e) => e.stopPropagation()}>
          <p>holaaaaa</p>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }