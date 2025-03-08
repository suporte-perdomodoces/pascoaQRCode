import React, { useState } from 'react';
import './Header.css';
import Button from "../Button";
import Modal from '../Modal';
import Overlay from '../Overlay';

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleManagement = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <header className="header-container">
            <img src="/image/logoPblue.png" alt="logo P" className='header-logo' />
            <Button onClick={handleManagement} className='header-button-management'>
                Gerenciar QR
            </Button>
            {isModalOpen && (
                <>
                    <Overlay />
                    <Modal onClose={closeModal}>
                        <Button onClick={closeModal} className='header-button'>
                            <img src='/image/xIcon.png' alt='Fechar' />
                        </Button>
                    </Modal>
                </>
            )}
        </header>
    );
}