/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Space, Button, Tag, Modal } from 'antd'
import { ProductTable, TableColumns } from '../../../interfaces/product'
import { notification } from '../../../helpers/notification'
import { load, filters, remove } from '../../../services/productService'
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined
} from '@ant-design/icons'

import './styles.scss'

import ProductPageHeader from '../../../components/ProductPageHeader'
import ProductFilters from '../../../components/ProductFilters'
import ModalDelete from '../../../components/ModalDelete'

const Product: React.FC = () => {
  const history = useHistory()
  const [products, setProducts] = useState<ProductTable[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [productSelect, setProductSelect] = useState<string>('')

  const columns: TableColumns[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name_column',
      render: (text: string) => <strong>{text}</strong>,
      width: '20%',
      align: 'left'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description_column',
      responsive: ['lg'],
      width: '35%',
      align: 'left'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price_column',
      render: (price: string) => <>R${price}</>,
      responsive: ['lg', 'md'],
      width: '10%',
      align: 'center'
    },
    {
      title: 'Stock',
      key: 'stock_column',
      dataIndex: 'stock',
      responsive: ['lg', 'md'],
      width: '10%',
      render: (stock: number) => (
        <Tag color={stock > 15 ? 'cyan' : 'volcano'} >
          { stock } units
        </Tag>
      ),
      align: 'center'
    },
    {
      title: 'Action',
      key: 'action_column',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="default" size="small" icon={ <EyeOutlined /> } onClick={() => detailProduct(record.id)}>View</Button>
          <Button type="primary" size="small" icon={ <EditOutlined /> } onClick={() => editProduct(record.id)}>Edit</Button>
          <Button type="primary" danger size="small" icon={ <DeleteOutlined /> } onClick={() => showModalDelete(record.id)}>Remove</Button>
        </Space>
      ),
      align: 'center'
    }
  ]

  useEffect(() => {
    loadProducts()
  }, [])

  function newProduct () {
    history.push('/products/register')
  }

  function editProduct (id: string) {
    history.push(`/products/register/${id}`)
  }

  function detailProduct (id: string) {
    history.push(`/products/detail/${id}`)
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
    setLoader(true)
    try {
      const response = await load()
      setProducts(response.data)
      setLoader(false)
    } catch (error) {
      setLoader(false)
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
        <ProductPageHeader
          title="Products"
          action1Title="Reload"
          action1Icon={<ReloadOutlined />}
          action1={loadProducts}
          action2Title="New Product"
          action2Icon={<PlusOutlined />}
          action2={newProduct}
        />

        <ProductFilters
          searchProducts={searchProducts}
        />

        <br/>
        <Table className="product-table" columns={columns} dataSource={products} loading={loader} />
      </div>

      <ModalDelete
        title="Remove Product"
        deleteProduct={deleteProduct}
        visible={showModal}
        cancel={() => setShowModal(false)}
        message="Do you want to remove this product?"
      />
    </>
  )
}

export default Product
