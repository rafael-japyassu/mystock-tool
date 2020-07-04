import React from 'react'
import { Card, Skeleton, Tag } from 'antd'
import { Product } from '../../../../interfaces/product'
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons'

import './styles.scss'

interface IProps {
  product: Product;
  loading: boolean;
  detailProduct: (id: string) => void;
  editProduct: (id: string) => void;
  showModalDelete: (id: string) => void;
}

const ProductCard: React.FC<IProps> = ({ product, loading, detailProduct, editProduct, showModalDelete }: IProps) => {
  return (
    <Card className="product-card"
      actions={[
        <EyeOutlined key={`view_${product.id}`} onClick={() => detailProduct(product.id)} />,
        <EditOutlined key={`edit_${product.id}`} onClick={() => editProduct(product.id)} />,
        <DeleteOutlined key={`delete_${product.id}`} onClick={() => showModalDelete(product.id)} />
      ]}
    >
      <Skeleton loading={loading} active>
        <div className="product-card-body">
          <div className="product-card-title">
            <h3>{product.name}</h3>
          </div>
          <div className="product-card-description">
            <span>{product.description}</span>
          </div>
          <div className="product-card-price">
            <span>R${product.price}</span>
          </div>
          <div className="product-card-stock">
            <Tag color={product.stock > 15 ? 'cyan' : 'volcano'} >
              { product.stock } units
            </Tag>
          </div>
          <div className="product-card-category">
            <Tag color={'geekblue'} >
              { product.category.name }
            </Tag>
          </div>
        </div>
      </Skeleton>
    </Card>
  )
}

export default ProductCard
