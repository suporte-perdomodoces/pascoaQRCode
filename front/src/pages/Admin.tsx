import { AdminPage } from "../components/AdminPage/AdminPage"
import Header from "../components/Header"
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
  const navigate = useNavigate();

  const handleForm = () => {
    navigate("/");
    console.log("Redirecionando para /admin");
};

  return (
    <>
      <Header buttonText="Formulario vídeo" onClick={handleForm}/>
      <AdminPage />
    </>
  )
}