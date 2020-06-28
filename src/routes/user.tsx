import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../pages/user/Login'
import SignUp from '../pages/user/SignUp'

const UserRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/login" exact component={Login} />
      <Route path="/sign-up" exact component={SignUp} />
    </Switch>
  )
}

export default UserRoutes
