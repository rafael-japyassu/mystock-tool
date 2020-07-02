import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Redirect } from 'react-router-dom'
import UserLayout from './containers/UserLayout'
import ReactNotification from 'react-notifications-component'
import AppLayout from './containers/AppLayout'
import AuthContext from './contexts/auth'
import { setHeaders } from './services/defaultService'

function App () {
  const { signed, token } = useContext(AuthContext)
  const [logged, setLogged] = useState<boolean>(false)

  useEffect(() => {
    setLogged(signed)
    setHeaders('Authorization', `Bearer ${token}`)
  }, [signed])

  function changeLayout () {
    return logged
      ? <>
        <Redirect to="/products" />
        <AppLayout />
      </>
      : <>
        <Redirect to="/login" />
        <UserLayout />
      </>
  }

  return (
    <BrowserRouter>
      <ReactNotification />
      { changeLayout() }
    </BrowserRouter>
  )
}

export default App
