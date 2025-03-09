import './Header.css';
import Button from "../Button";
import { FormEvent } from 'react';

interface HeaderProps {
    buttonText: string;
    onClick: (e: FormEvent<Element>) => void;
}

export default function Header({buttonText, onClick}: HeaderProps) {
    
    return (
        <header className="header-container">
            <img src="/image/logoPblue.png" alt="logo P" className='header-logo' />
            <Button onClick={onClick} className='header-button-management'>
                {buttonText}
            </Button>
        </header>
    );
}
