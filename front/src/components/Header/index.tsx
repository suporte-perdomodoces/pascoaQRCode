import './Header.css';
import { useNavigate } from 'react-router-dom'; // Correto para navegação
import Button from "../Button";

export default function Header() {
    const navigate = useNavigate(); // Hook para navegação

    const handleManagement = () => {
        navigate("/admin"); // Redireciona para a rota "/admin"
        console.log("Redirecionando para /admin");
    };

    return (
        <header className="header-container">
            <img src="/image/logoPblue.png" alt="logo P" className='header-logo' />
            <Button onClick={handleManagement} className='header-button-management'>
                Gerenciar QR
            </Button>
        </header>
    );
}
