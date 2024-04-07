import { InfoProps } from "../../../interfaces";

export default function ModalContent({
  title,
  content,
  classname = "",
}: InfoProps) {
  return (
    <div className={`text-start m-auto my-2 ${classname}`}>
      <p className="font-semibold lg:pt-2 pt-1 text-sm lg:text-lg">{title}</p>
      <p className="text-[12px]">{content}</p>
    </div>
  );
}
