import React from 'react';
import './Modal.css';

interface ModalProps {
    children: React.ReactNode;
    onClose?: () => void;
}

function Modal({ children, onClose }: ModalProps) {
    return (
        <div className="modal-container">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
}

export default Modal;