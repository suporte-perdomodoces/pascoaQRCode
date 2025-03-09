import { useNavigate } from "react-router-dom";
import { AdminPage } from "../components/AdminPage/AdminPage"
import Header from "../components/Header"




export const Admin = () => {
  const navigate = useNavigate()


  const handleManagement = () => {
    navigate("/"); // Redireciona para a rota "/admin"
    console.log("Redirecionando para /admin");
  };

  return (
    <>
      <Header props={{ buttonTitle: "Home", onclick: handleManagement}}/>
      <AdminPage />
    </>
  )
}