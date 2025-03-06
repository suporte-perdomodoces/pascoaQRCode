import './Textarea.css';

interface TextareaProps {
    id: string;
    name: string;
    className: string;
    placeholder: string;
    value: string;
    r: boolean;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({ id, name, className, placeholder, value, r, onChange }: TextareaProps) {
    return (
        <textarea
            id={id}
            name={name}
            className={className}
            placeholder={placeholder}
            value={value}
            required={r}
            onChange={onChange}
        />
    );

}