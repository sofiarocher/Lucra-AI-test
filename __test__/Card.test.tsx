import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '@/app/components/card-info';
import LucraT from "@/public/lucra-text.png"
import LucraI from "@/public/lucra-image.png"
import LucraH from "@/public/lucra-help.png"

describe('Card component', () => {
    const renderCard = (props: any) => render(<Card {...props} />);

    it('text card renders correctly', () => {
        const props = {
          title: 'Text Generation',
          image: LucraT, 
          alt: 'Lucra Text AI Model',
        };
    
        renderCard(props);
        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByAltText(props.alt)).toBeInTheDocument();
      });

    it('image card renders correctly', () => {
        const props = {
          title: 'Image Generation (Oct, 2024)',
          image: LucraI, 
          alt: 'Lucra Image AI Model',
        };
    
        renderCard(props);
        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByAltText(props.alt)).toBeInTheDocument();
      });

    it('help card renders correctly', () => {
        const props = {
          title: 'Need Help?',
          image: LucraH, 
          alt: 'Lucra Help AI Model',
          classname: 'hover:bg-black/10 cursor-pointer',
          modal: jest.fn(),
        };
    
        renderCard(props);
        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByAltText(props.alt)).toBeInTheDocument();
      });
  });