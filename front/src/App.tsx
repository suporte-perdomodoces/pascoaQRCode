import "./App.css";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./Context/Auth/RequireAuth";
import FormVideo from "./pages/FormVideo";
import Login from "./pages/Login";
import { AdminPage } from "./pages/pages";
import View from "./pages/view";

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><FormVideo /></RequireAuth>} />
      <Route path="/client" element={<RequireAuth><View /></RequireAuth>} />
      <Route path="/admin" element={<RequireAuth><AdminPage /></RequireAuth>} />
    </Routes>
  );
}

export default App;
