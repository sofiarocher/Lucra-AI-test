
interface InfoProps {
    title: string;
    content: string;
    classname?: string;
}

export default function ModalContent({ title, content, classname }: InfoProps) {
    return (
      <div className={`text-start m-auto my-4 ${classname}`}>
        <p className='font-semibold pt-4'>{title}</p>
        <p>{content}</p>
      </div>
    );
  }