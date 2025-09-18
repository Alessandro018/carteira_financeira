// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//     value: string;
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     placeholder: string;
//     className: string;
// }
export default function Input({...props}: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
    );
}