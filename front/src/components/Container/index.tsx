import type { ReactNode } from 'react';
import './Container.css';

interface ContainerProps {
    children: ReactNode;
    className: string
}

export default function Container({ children, className }: ContainerProps) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}