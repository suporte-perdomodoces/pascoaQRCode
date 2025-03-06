
import { type JSX, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"

import { UseApi } from "../../Hooks/UseApi"
import type { User } from "../../Types/Auth"

const authApi = new UseApi().authApi


export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const validateToken = async () => {
      const token = localStorage.getItem('token')

      if (!token) return;
      console.log(`token: ${token}`)
      const res = await authApi.validateToken(token);

      console.log("Res: ", res);
      
      const user = res
      setUser(user)
      return user
    }; validateToken()


  }, [])

  const login = async (email: string, password: string) => {

    const data = await authApi.login({email, password})

    if( !data.user || !data.token ) {
      return false;
    }

    console.log(data.user);
    console.log(data)
    setUser(data.user)
    localStorage.setItem('token', data.token)
    return true
    
  }

  const logout = async () => {
    await authApi.logout()
    localStorage.removeItem('token')
    setUser(null)
    return
  }

  return (
    <AuthContext.Provider value = {{user, login, logout}}>
      { children }
    </AuthContext.Provider>
  )
}