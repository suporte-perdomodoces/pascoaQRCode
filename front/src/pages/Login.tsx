import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/Auth/AuthContext";
import Container from "../components/Container";
import FormLogin from "../components/FormLogin";


export default function Login() {

    return (
        <Container className="container_01">
            <FormLogin />
        </Container>
    )
} 