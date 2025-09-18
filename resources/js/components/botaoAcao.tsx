import React, { JSX } from "react";

interface PropriedadesBotaoAcao extends React.HTMLAttributes<HTMLHyperlinkElementUtils> {
    children: JSX.Element,
    irPara: string
}
export default function BotaoAcao({children, irPara} : PropriedadesBotaoAcao) {
    return (
        <a href={irPara} className="bg-white hover:bg-gray-300 hover:cursor-pointer shadow-md py-2 px-4 rounded-xl">
            {children}
        </a>
    );
}