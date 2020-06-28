import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Product from '../pages/app/Product'
import ProductForm from '../pages/app/Product/Form'

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/products" exact component={Product} />
      <Route path="/products/register" exact component={ProductForm} />
    </Switch>
  )
}

export default AppRoutes
