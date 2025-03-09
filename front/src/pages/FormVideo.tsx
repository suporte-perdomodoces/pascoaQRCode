import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Form from "../components/Form";
import Header from "../components/Header";

export default function FormVideo() {

    const navigate = useNavigate(); 

    const handleManagement = () => {
        navigate("/admin");
        console.log("Redirecionando para /admin");
    };

    return (
        <Container className="container_02">
            <Header buttonText="Gerenciar QR" onClick={handleManagement}/>
            <Form />
        </Container>
    )
}