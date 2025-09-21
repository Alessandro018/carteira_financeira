import React, { JSX } from "react";

interface PropriedadesBotaoAcao extends React.HTMLAttributes<HTMLHyperlinkElementUtils> {
    children: JSX.Element,
    navegarPara: string,
    className?: string
}
export default function BotaoAcao({children, navegarPara, className = ''} : PropriedadesBotaoAcao) {
    return (
        <a 
            href={navegarPara}
            className={`bg-white hover:bg-gray-200 hover:cursor-pointer py-2 px-4 rounded-xl min-w-30 border border-gray-200 ${className}`}>
            {children}
        </a>
    );
}