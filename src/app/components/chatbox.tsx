import Image from "next/image";
import Prompt from "./input-prompt";
import Close from "../../../public/lucra-cross.svg"
import User from "../../../public/lucra-user.png"
import LucraU from "../../../public/lucra-user.png"

interface CardProps {
    title: string;
    onclick?: () => void; 
}

export default function Chat({ title, onclick }: CardProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center lg:p-24 relative gap-20">
            <Image src={Close} alt="Close Icon" onClick={onclick} className="absolute right-0 top-20 opacity-30" />
            <p className="lg:text-4xl text-2xl font-bold text-transparent bg-clip-text bg-text-gradient">{title} </p>
            <div className="h-3/4 w-full bg-gray-300/5 rounded-lg border-1 border-blue-300/10 text-white/90">
                <div className="flex items-center font-medium justify-end p-4 text-sm">
                    <p className="pr-2">User</p>
                    <Image src={User} alt="User Profile Picture" className="w-8"/>
                </div>
                <div className="flex items-center font-medium justify-start p-4 text-sm">
                    <Image src={User} alt="User Profile Picture" className="w-8"/>
                    <p className="pl-2">Lucra</p>
                </div>
                
            </div>
            <Prompt classname=""/>
        </div>
    )
}
