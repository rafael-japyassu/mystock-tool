/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { Form, Input, Button, InputNumber, Row, Col, Select } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { load as loadCategories } from '../../../../services/categoryService'
import { Category } from '../../../../interfaces/category'
import { notification } from '../../../../helpers/notification'
import {
  LeftOutlined,
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons'

import { ProductFormInterface } from '../../../../interfaces/product'
import { save, find, update } from '../../../../services/productService'

import './styles.scss'
import { Store } from 'antd/lib/form/interface'

const { useForm } = Form
const { Option } = Select

const ProductForm: React.FC = () => {
  const history = useHistory()
  const { id } = useParams()
  const [form] = useForm()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    loadCategoriesFilter()
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      loadProduct()
    }
  }, [id])

  function back () {
    history.goBack()
  }

  async function loadProduct () {
    try {
      const response = await find(id)

      form.setFieldsValue({
        name: response.data.name,
        category_id: response.data.category_id,
        description: response.data.description,
        stock: response.data.stock,
        price: response.data.price
      })
    } catch (error) {
      if (error.response === undefined) {
        notification('Error', 'Internal server error!', 'danger')
      } else if (error.response.status === 401) {
        notification('Alerta', error.response.data.message, 'warning')
      } else if (error.response.status === 400) {
        notification('Alerta', error.response.data.message, 'warning')
      } else {
        notification('Erro', error.response.data.message, 'danger')
      }
    }
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
      } else if (error.response.status === 400) {
        notification('Alerta', error.response.data.message, 'warning')
      } else {
        notification('Erro', error.response.data.message, 'danger')
      }
    }
  }

  async function onSave (values: Store) {
    try {
      const productFormValue = values as ProductFormInterface

      if (id !== undefined) {
        await update(id, productFormValue)
        notification('Success', 'Product updated successfully!', 'success')
      } else {
        await save(productFormValue)
        notification('Success', 'Product successfully registered!', 'success')
      }
      back()
    } catch (error) {
      if (error.response === undefined) {
        notification('Error', 'Internal server error!', 'danger')
      } else if (error.response.status === 401) {
        notification('Alerta', error.response.data.message, 'warning')
      } else if (error.response.status === 400) {
        notification('Alerta', error.response.data.message, 'warning')
      } else {
        notification('Erro', error.response.data.message, 'danger')
      }
    }
  }

  function checkPrice (rule: any, value: any) {
    if (value.number > 0) {
      return Promise.resolve()
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('Price must be greater than zero!')
    }
  }

  return (
    <>
      <div className="product-list-page">
        <div className="product-list-header">
          <h2>
            {
              id !== undefined ? 'Edit Product' : 'New Product'
            }
          </h2>
          <Button type="primary" icon={ <LeftOutlined />} onClick={back}>Back</Button>
        </div>
        <br/>
        <Form
          layout="vertical"
          onFinish={onSave}
          form={form}
        >
          <Row>
            <Col lg={6} md={12} xs={24} >
              <Form.Item
                label="Name"
                required
                name="name"
                rules={[{ required: true, message: 'This field is required!' }]}
                className="input-group-products"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={6} md={12} xs={24} >
              <Form.Item
                label="Price"
                name="price"
                required
                rules={[
                  { required: true, message: 'This field is required!' },
                  {
                    type: 'number',
                    validator: (rule, value) => {
                      if (value < 0) {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        return Promise.reject('Invalid price')
                      }
                      return Promise.resolve()
                    }
                  }
                ]}
                className="input-group-products"
              >
                <InputNumber className="input-price" />
              </Form.Item>
            </Col>
            <Col lg={6} md={12} xs={24} >
              <Form.Item
                label="Stock"
                required
                name="stock"
                rules={[
                  { required: true, message: 'This field is required!' },
                  {
                    type: 'number',
                    validator: (rule, value) => {
                      if (value < 0) {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        return Promise.reject('Invalid stock quantity!')
                      }
                      return Promise.resolve()
                    }
                  }
                ]}
                className="input-group-products"
              >
                <InputNumber
                  className="input-price"
                />
              </Form.Item>
            </Col>
            <Col lg={6} md={12} xs={24} >
              <Form.Item
                label="Category"
                required
                name="category_id"
                rules={[{ required: true, message: 'This field is required!' }]}
              >
                <Select
                  placeholder="Select a category"
                  allowClear
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
            required
            name="description"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input.TextArea />
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
