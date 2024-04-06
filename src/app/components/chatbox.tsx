interface CardProps {
    title: string;
    onclick?: () => void; 
}

export default function Chat({ title, onclick }: CardProps) {
    return (
        <div className="" onClick={onclick}>
            <p className="lg:text-4xl text-2xl font-bold text-transparent bg-clip-text bg-text-gradient">{title} </p>
        
        </div>
    )
}
