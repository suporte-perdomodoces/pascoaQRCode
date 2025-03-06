import './Input.css';

interface InputProps {
  type: string;
  placeholder: string;
  className: string;
  id: string;
  name: string;
  value: string;
  r: boolean;
  d?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, placeholder, className, id, name, value, r, d, onChange }: InputProps) {
  return (
    <input
      autoComplete='off'
      type={type}
      placeholder={placeholder}
      className={className}
      id={id}
      name={name}
      value={value}
      required={r}
      disabled={d}
      onChange={onChange}
    />
  )
}