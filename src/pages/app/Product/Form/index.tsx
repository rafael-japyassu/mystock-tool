/* eslint-disable react/display-name */
import React, { useState, useEffect, ChangeEvent } from 'react'
import { Form, Input, Button, InputNumber, Row, Col, Select } from 'antd'
import { useHistory } from 'react-router-dom'
import { load as loadCategories } from '../../../../services/categoryService'
import { Category } from '../../../../interfaces/category'
import { notification } from '../../../../helpers/notification'
import {
  LeftOutlined,
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons'

import './styles.scss'
import { ProductFormInterface } from '../../../../interfaces/product'

const { Option } = Select

const ProductForm: React.FC = () => {
  const history = useHistory()
  const [product, setProduct] = useState<ProductFormInterface>({
    name: '',
    category_id: '',
    description: '',
    price: 0,
    stock: 0
  })
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    loadCategoriesFilter()
  }, [])

  function back () {
    history.goBack()
  }

  async function loadCategoriesFilter () {
    try {
      const response = await loadCategories()
      setCategories(response.data)
    } catch (error) {
      if (error.response === undefined) {
        notification('Error', 'Internal server error!', 'danger')
      } else if (error.response.status === 401) {
        notification('Alerta', error.response.data.message, 'warning')
      } else {
        notification('Erro', error.response.data.message, 'danger')
      }
    }
  }

  function updateModel (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  function updatePrice (value: string | number | undefined) {
    if (typeof value === 'number') {
      setProduct({ ...product, price: value })
    }
  }

  function updateStock (value: string | number | undefined) {
    if (typeof value === 'number') {
      setProduct({ ...product, stock: value })
    }
  }

  function onSave () {
    console.log(product)
  }

  return (
    <>
      <div className="product-list-page">
        <div className="product-list-header">
          <h2>New Product</h2>
          <Button type="primary" icon={ <LeftOutlined />} onClick={back}>Back</Button>
        </div>
        <br/>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onSave}
          // onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col lg={6} md={12} xs={24} >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
                className="input-group-products"
              >
                <Input
                  name="name"
                  value={product.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                />
              </Form.Item>
            </Col>
            <Col lg={6} md={12} xs={24} >
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input your username!', type: 'number', min: 0 }]}
                className="input-group-products"
              >
                <InputNumber
                  className="input-price"
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={(price) => updatePrice(price)}
                />
              </Form.Item>
            </Col>
            <Col lg={6} md={12} xs={24} >
              <Form.Item
                label="Stock"
                name="stock"
                rules={[{ required: true, message: 'Please input your username!', type: 'number', min: 0 }]}
                className="input-group-products"
              >
                <InputNumber
                  className="input-price"
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={(stock) => updateStock(stock)}
                />
              </Form.Item>
            </Col>
            <Col lg={6} md={12} xs={24} >
              <Form.Item
                label="Category"
                name="category_id"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Select
                  placeholder="Select a category"
                  allowClear
                  value={product.category_id}
                  onChange={(category_id) => setProduct({ ...product, category_id })}
                >
                  {
                    categories.map(category => (
                      <Option value={category.id} key={category.id}>{ category.name }</Option>
                    ))
                  }
                </Select>
              </Form.Item>

            </Col>
          </Row>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input.TextArea
              name="description"
              value={product.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateModel(e)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              icon={<SaveOutlined />}
              type="primary"
              htmlType="submit">
              Save
            </Button>{' '}
            <Button
              icon={<CloseOutlined />}
              type="default"
              htmlType="button"
              onClick={back}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default ProductForm
