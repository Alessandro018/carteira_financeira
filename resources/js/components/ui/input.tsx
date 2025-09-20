import { Ref } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: Ref<HTMLInputElement>;
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({ref, ...props}: InputProps) {
    return (
        <input
            ref={ref}
            {...props}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
    );
}