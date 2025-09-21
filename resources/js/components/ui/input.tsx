import { Ref } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: Ref<HTMLInputElement>;
    className?: string;
    erro?: string
}
export default function Input({ref, className, erro, ...props}: InputProps) {
    return (
        <>
            <input
                ref={ref}
                {...props}
                className={`w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${className} ${erro ? 'border-red-500' : ''}`}
            />
            {erro && <p className="text-red-500 text-sm mt-1">{erro}</p>}
        </>
    );
}