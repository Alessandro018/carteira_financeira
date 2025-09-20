import React, { JSX } from "react";

interface PropriedadesBotaoAcao extends React.HTMLAttributes<HTMLHyperlinkElementUtils> {
    children: JSX.Element,
    navegarPara: string
}
export default function BotaoAcao({children, navegarPara} : PropriedadesBotaoAcao) {
    return (
        <a href={navegarPara} className="bg-white hover:bg-gray-300 hover:cursor-pointer shadow-md py-2 px-4 rounded-xl">
            {children}
        </a>
    );
}