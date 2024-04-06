
interface InfoProps {
    title: string;
    content: string;
    classname?: string;
}

export default function ModalContent({ title, content, classname }: InfoProps) {
    return (
      <div className={`text-start m-auto lg:my-4 my-2 ${classname}`}>
        <p className='font-semibold lg:pt-4 pt-1 text-sm lg:text-xl'>{title}</p>
        <p className="text-[12px] lg:text-sm ">{content}</p>
      </div>
    );
  }