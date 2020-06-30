import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Product from '../pages/app/Product'
import ProductForm from '../pages/app/Product/Form'
import ProductDetail from '../pages/app/Product/Detail'
import Category from '../pages/app/Category'
import CategoryForm from '../pages/app/Category/Form'

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/products" exact component={Product} />
      <Route path="/products/register" exact component={ProductForm} />
      <Route path="/products/register/:id" exact component={ProductForm} />
      <Route path="/products/detail/:id" exact component={ProductDetail} />
      <Route path="/categories" exact component={Category} />
      <Route path="/categories/register" exact component={CategoryForm} />
      <Route path="/categories/register/:id" exact component={CategoryForm} />
    </Switch>
  )
}

export default AppRoutes
