import React, { createContext, useState, useEffect } from 'react'
import { UserLogged, UserSession } from '../interfaces/user'
import { setHeaders } from '../services/defaultService'

interface AuthContextData {
  signed: boolean;
  token: string;
  user: UserSession;
  signin: (user: UserLogged) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC = ({ children }) => {
  const [userAuth, setUserAuth] = useState<UserSession>({} as UserSession)
  const [tokenAuth, setTokenAuth] = useState<string>('')

  function signin ({ user, token }: UserLogged) {
    localStorage.setItem('uid_app', user.id)
    localStorage.setItem('user_app', user.name)
    localStorage.setItem('token_app', token)
    setHeaders('Authorization', `Bearer ${token}`)

    setUserAuth(user)
    setTokenAuth(token)
  }

  function logout () {
    localStorage.clear()

    setUserAuth({} as UserSession)
    setTokenAuth('')
  }

  return (
    <AuthContext.Provider value={{
      signed: !!localStorage.getItem('uid_app'),
      token: localStorage.getItem('token_app') || tokenAuth,
      user: userAuth,
      signin,
      logout
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext
