import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Form from "../components/Form";
import Header from "../components/Header";

export default function FormVideo() {

    const navigate = useNavigate()

    const handleManagement = () => {
        navigate("/admin"); // Redireciona para a rota "/admin"
        console.log("Redirecionando para /admin");
    };
    return (
        <Container className="container_02">
            <Header props={{ buttonTitle: "Gerenciar QR Code", onclick: handleManagement }}/>
            <Form />
        </Container>
    )
}