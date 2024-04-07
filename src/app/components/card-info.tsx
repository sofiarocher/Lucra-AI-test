// Importing Image component from Next.js for optimized image rendering
import Image from "next/image";
// Importing CardProps interface for type checking of props
import { CardProps } from '../../../interfaces';

// Functional component 'Card' to render a card-like UI element
export default function Card({
  title,       // Text to be displayed as the title of the card
  image,       // Image URL or local path for the card image
  alt,         // Alternative text for the image, used for accessibility
  classname = "", // Optional classname for additional styling, defaults to an empty string
  modal,       // Optional click handler function, typically for opening a modal on card click
}: CardProps) {
  return (
    // Card container with conditional styling and an onClick event handler
    <div
      className={`text-white flex flex-col items-center justify-center bg-gray-300/5 border-1 border-blue-300/30 rounded-xl pt-4 px-4 lg:w-auto w-full ${classname}`}
      onClick={modal}
    >
      <p className="font-semibold lg:text-xl text-sm">{title}</p> {/* Title of the card */}
      <Image
        src={image} // Source of the card image
        alt={alt} // Alternative text for the image
        className="saturate-150 contrast-100 brightness-[90%] w-[130px] lg:w-[200px]" // Styling for the image
      />
    </div>
  );
}
