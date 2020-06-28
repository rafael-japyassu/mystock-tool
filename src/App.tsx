import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import UserLayout from './containers/UserLayout'
import ReactNotification from 'react-notifications-component'
import AppLayout from './containers/AppLayout'

function App () {
  return (
    <BrowserRouter>
      <ReactNotification />
      {/* <UserLayout /> */}
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
