import { Ref } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: Ref<HTMLInputElement>;
    className?: string;
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({ref, className, ...props}: InputProps) {
    return (
        <input
            ref={ref}
            {...props}
            className={"w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" + className}
        />
    );
}