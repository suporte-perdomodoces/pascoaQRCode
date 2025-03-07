import "./Button.css";

interface ButtonProps {
    children: string;
    d: boolean;
    onClick: (e: React.FormEvent) => void;
    className: string;
    type?: "button" | "submit" | "reset";
}

export default function Button({ children, d, onClick, className, type }: ButtonProps) {
    return (
        <button onClick={onClick} className={className} type={type} disabled={d}>
            {children}
        </button>
    );
}