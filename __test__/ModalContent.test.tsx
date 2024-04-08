import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ModalContent from '@/app/components/modal-info';

describe('Modal content component', () => {
    const renderModalContent = (props: any) => render(<ModalContent {...props} />);

    it('reasons to use info renders correctly', () => {
        const props = {
          title: 'Reasons to use Lucra',
          content: "This platform leverages the advanced Gemini AI API to deliver smart, adaptive solutions. It enables task automation, creative content generation, and insights from large data sets, enhancing efficiency and innovation.",
        };
    
        renderModalContent(props);
        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByText(props.content)).toBeInTheDocument();
      });

    it('home info renders correctly', () => {
        const props = {
            title: 'Home',
            content:"The home page provides an overview of the available features and services. Users can easily access text and image generation tools and explore the various functionalities offered by the OpenAI API.",
        };
    
        renderModalContent(props);
        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByText(props.content)).toBeInTheDocument();
      });

    it('prompt info renders correctly', () => {
        const props = {
          title: 'Prompts',
          content: "Prompts allow interaction with the API by generating specific responses to user-inputted questions or phrases. This section facilitates the creation of personalized content and intuitive exploration of artificial intelligence.",
        };
    
        renderModalContent(props);
        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByText(props.content)).toBeInTheDocument();
      });

    it('text info renders correctly', () => {
        const props = {
            title: 'Text Generation',
            content: "Text generation uses artificial intelligence to create coherent and contextual written content. This tool is ideal for drafting articles, generating creative ideas, or building complex narratives automatically.",
        };
    
        renderModalContent(props);
        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByText(props.content)).toBeInTheDocument();
      });

    it('image info renders correctly', () => {
        const props = {
            title: 'Image Generation (Available in Oct, 2024)',
            content:"Image generation allows for the creation of unique visuals from textual descriptions, opening a spectrum of creative and design possibilities. This feature transforms words into detailed images, facilitating innovative graphic material creation.",
        };
    
        renderModalContent(props);
        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByText(props.content)).toBeInTheDocument();
      });
  });