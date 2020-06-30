/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { Descriptions } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { notification } from '../../../../helpers/notification'
import {
  LeftOutlined,
  EditOutlined
} from '@ant-design/icons'

import { Product } from '../../../../interfaces/product'
import { find } from '../../../../services/productService'
import moment from 'moment'

import './styles.scss'

import ProductPageHeader from '../../../../components/ProductPageHeader'

const ProductDetail: React.FC = () => {
  const history = useHistory()
  const { id } = useParams()
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    if (id !== undefined) {
      loadProduct()
    }
  }, [id])

  function back () {
    history.goBack()
  }

  function editProduct () {
    history.push(`/products/register/${id}`)
  }

  function formatDate (date: Date | undefined) {
    return moment(date).format('DD/MM/yyyy')
  }

  async function loadProduct () {
    try {
      const response = await find(id)
      setProduct(response.data)
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
        <ProductPageHeader
          title="Product Detail"
          action1Title="Edit"
          action1Icon={<EditOutlined />}
          action1={editProduct}
          action2Title="Back"
          action2Icon={<LeftOutlined />}
          action2={back}
        />
        <br/>
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Product"><strong>{ product?.name }</strong></Descriptions.Item>
          <Descriptions.Item label="Price">R${ product?.price }</Descriptions.Item>
          <Descriptions.Item label="Stock">{ product?.stock } { product?.stock !== undefined && product.stock > 1 ? 'units' : 'unit'}</Descriptions.Item>
          <Descriptions.Item label="Category">{ product?.category.name }</Descriptions.Item>
          <Descriptions.Item label="Registration Date">{ formatDate(product?.created_at) }</Descriptions.Item>
          <Descriptions.Item label="Last Update">
            { formatDate(product?.updated_at) }
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            { product?.description }
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  )
}

export default ProductDetail
