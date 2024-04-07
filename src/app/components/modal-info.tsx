// Importing the type for the component props from a centralized interface definition.
import { InfoProps } from "../../../interfaces";

// ModalContent functional component definition using destructuring to extract properties from props.
export default function ModalContent({
  title,
  content,
  classname = "",
}: InfoProps) {
  // Returning JSX for the ModalContent component.
  return (
    <div className={`text-start m-auto my-2 ${classname}`}>
      <p className="font-semibold lg:pt-2 pt-1 text-sm lg:text-lg">{title}</p>
      <p className="text-[12px]">{content}</p>
    </div>
  );
}
