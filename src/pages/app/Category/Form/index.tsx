/* eslint-disable react/display-name */
import React, { useState, useEffect, ChangeEvent } from 'react'
import { Form, Input, Button, Row, Col } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { save, update, find } from '../../../../services/categoryService'
import { notification } from '../../../../helpers/notification'
import {
  LeftOutlined,
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons'

import { ProductFormInterface } from '../../../../interfaces/product'

import './styles.scss'
import { Store } from 'antd/lib/form/interface'

const { useForm } = Form

const CategoryForm: React.FC = () => {
  const history = useHistory()
  const { id } = useParams()
  const [form] = useForm()

  useEffect(() => {
    if (id !== undefined) {
      loadCategory()
    }
  }, [id])

  function back () {
    history.goBack()
  }

  async function loadCategory () {
    try {
      const response = await find(id)

      form.setFieldsValue({
        name: response.data.name
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

  async function onSave (value: Store) {
    try {
      const category = value as { name: string }
      if (id !== undefined) {
        await update(id, category)
        notification('Success', 'Category updated successfully!', 'success')
      } else {
        await save(category)
        notification('Success', 'Category successfully registered!', 'success')
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

  return (
    <>
      <div className="product-list-page">
        <div className="product-list-header">
          <h2>
            {
              id !== undefined ? 'Edit Category' : 'New Category'
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
            <Col lg={24} md={24} xs={24} >
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
          </Row>

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

export default CategoryForm
