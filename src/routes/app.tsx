import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Product from '../pages/app/Product'
import ProductForm from '../pages/app/Product/Form'
import ProductDetail from '../pages/app/Product/Detail'

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/products" exact component={Product} />
      <Route path="/products/register" exact component={ProductForm} />
      <Route path="/products/register/:id" exact component={ProductForm} />
      <Route path="/products/detail/:id" exact component={ProductDetail} />
    </Switch>
  )
}

export default AppRoutes
