/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Space, Input, Button, Select, Tag, Modal } from 'antd'
import { Product as ProductService, TableColumns } from '../../../interfaces/product'
import { notification } from '../../../helpers/notification'
import { load, filters, remove } from '../../../services/productService'
import { load as loadCategories } from '../../../services/categoryService'
import { Category } from '../../../interfaces/category'

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons'

import './styles.scss'

const { Option } = Select

const Product: React.FC = () => {
  const history = useHistory()
  const [products, setProducts] = useState<ProductService[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [productSelect, setProductSelect] = useState<string>('')

  const columns: TableColumns[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <strong>{text}</strong>,
      width: '20%'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      responsive: ['lg'],
      width: '35%'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => <>R$ {price}</>,
      responsive: ['lg', 'md'],
      width: '10%'
    },
    {
      title: 'Stock',
      key: 'stock',
      dataIndex: 'stock',
      responsive: ['lg', 'md'],
      width: '10%',
      render: (stock: number) => (
        <Tag color={stock > 15 ? 'cyan' : 'volcano'} >
          { stock } units
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="default" size="small" icon={ <EyeOutlined /> } >View</Button>
          <Button type="primary" size="small" icon={ <EditOutlined /> } >Edit</Button>
          <Button type="primary" danger size="small" icon={ <DeleteOutlined /> } onClick={() => showModalDelete(record.id)}>Remove</Button>
        </Space>
      )
    }
  ]

  useEffect(() => {
    loadProducts()
    loadCategoriesFilter()
  }, [])

  function newProduct () {
    history.push('/products/register')
  }

  function showModalDelete (id: string) {
    setShowModal(true)
    setProductSelect(id)
  }

  async function deleteProduct () {
    try {
      await remove(productSelect)
      loadProducts()
      setProductSelect('')
      setShowModal(false)
    } catch (error) {
      setProductSelect('')
      if (error.response === undefined) {
        notification('Error', 'Internal server error!', 'danger')
      } else if (error.response.status === 401) {
        notification('Alerta', error.response.data.message, 'warning')
      } else {
        notification('Erro', error.response.data.message, 'danger')
      }
    }
  }

  async function loadProducts () {
    try {
      const response = await load()
      setProducts(response.data)
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

  async function searchProducts (name = '', description = '', category_id = '') {
    try {
      const params = {
        name,
        description,
        category_id: category_id === undefined ? '' : category_id,
        size: 10,
        page: 1
      }

      const response = await filters(params)
      setProducts(response.data)
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

  return (
    <>
      <div className="product-list-page">
        <div className="product-list-header">
          <h2>Filters</h2>
          <Button type="primary" icon={ <PlusOutlined /> } onClick={newProduct}>New Product</Button>
        </div>
        <div className="filter-products">
          <Input.Search
            className="input-filter"
            placeholder="Search by name"
            onSearch={(value: string) => searchProducts(value)}
          />

          <Select
            placeholder="Select a category"
            className="input-filter"
            allowClear
            onChange={(value: string) => searchProducts('', '', value)}
          >
            {
              categories.map(category => (
                <Option value={category.id} key={category.id}>{ category.name }</Option>
              ))
            }
          </Select>

          <Input.Search
            className="input-filter"
            placeholder="Search by description"
            onSearch={(value: string) => searchProducts('', value)}
          />
        </div>
        <br/>
        <Table className="product-table" columns={columns} dataSource={products} />
      </div>

      <Modal
        title="Remove Product"
        visible={showModal}
        onOk={deleteProduct}
        okText="Yes"
        okType={'primary'}
        okButtonProps={{ danger: true }}
        onCancel={() => setShowModal(false)}
      >
        Do you want to remove this product?
      </Modal>
    </>
  )
}

export default Product
