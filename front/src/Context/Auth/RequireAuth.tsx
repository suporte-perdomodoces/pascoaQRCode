import { type JSX, useContext } from "react";
import Login from "../../pages/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);

  return auth.user ? children : <Login />

};
