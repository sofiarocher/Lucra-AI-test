
interface InfoProps {
    title: string;
    content: string ;
}

export default function ModalContent({ title, content }: InfoProps) {
    return (
      <div className='text-start m-auto my-4'>
        <p className='font-semibold pt-4'>{title}</p>
        <p>{content}</p>
      </div>
    );
  }