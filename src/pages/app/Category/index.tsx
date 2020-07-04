/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Space, Button } from 'antd'
import { CategoryTable } from '../../../interfaces/category'
import { TableColumns } from '../../../interfaces/product'
import { notification } from '../../../helpers/notification'
import { load, remove } from '../../../services/categoryService'
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined
} from '@ant-design/icons'

import './styles.scss'

import ProductPageHeader from '../../../components/ProductPageHeader'
import ModalDelete from '../../../components/ModalDelete'

const Category: React.FC = () => {
  const history = useHistory()
  const [categories, setCategories] = useState<CategoryTable[]>([])
  const [loader, setLoader] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [categorySelect, setCategorySelect] = useState<string>('')

  const columns: TableColumns[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <strong>{text}</strong>,
      width: '80%',
      align: 'left'
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="primary" size="small" icon={ <EditOutlined /> } onClick={() => editCategory(record.id)}>Edit</Button>
          <Button type="primary" danger size="small" icon={ <DeleteOutlined /> } onClick={() => showModalDelete(record.id)}>Remove</Button>
        </Space>
      ),
      align: 'center'
    }
  ]

  useEffect(() => {
    loadCategories()
  }, [])

  function newCategory () {
    history.push('/categories/register')
  }

  function editCategory (id: string) {
    history.push(`/categories/register/${id}`)
  }

  function showModalDelete (id: string) {
    setShowModal(true)
    setCategorySelect(id)
  }

  async function deleteProduct () {
    try {
      await remove(categorySelect)
      loadCategories()
      setCategorySelect('')
      setShowModal(false)
    } catch (error) {
      setCategorySelect('')
      if (error.response === undefined) {
        notification('Error', 'Internal server error!', 'danger')
      } else if (error.response.status === 401) {
        notification('Alerta', error.response.data.message, 'warning')
      } else {
        notification('Erro', error.response.data.message, 'danger')
      }
    }
  }

  async function loadCategories () {
    setLoader(true)
    try {
      const response = await load()
      setCategories(response.data)
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

  return (
    <>
      <div className="product-list-page">
        <ProductPageHeader
          title="Categories"
          action1Title="Reload"
          action1Icon={<ReloadOutlined />}
          action1={loadCategories}
          action2Title="New Category"
          action2Icon={<PlusOutlined />}
          action2={newCategory}
        />

        <br/>
        <Table className="product-table" columns={columns} dataSource={categories} loading={loader} />
      </div>
      <ModalDelete
        title="Remove Category"
        deleteProduct={deleteProduct}
        visible={showModal}
        cancel={() => setShowModal(false)}
        message="Do you want to remove this category?"
      />
    </>
  )
}

export default Category
