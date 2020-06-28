import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import UserLayout from './containers/UserLayout'
import ReactNotification from 'react-notifications-component'

function App () {
  return (
    <BrowserRouter>
      <ReactNotification />
      <UserLayout />
    </BrowserRouter>
  )
}

export default App
