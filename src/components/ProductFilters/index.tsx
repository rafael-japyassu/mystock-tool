import React, { useState, useEffect } from 'react'
import { Input, Select } from 'antd'
import { Category } from '../../interfaces/category'
import { notification } from '../../helpers/notification'
import { load } from '../../services/categoryService'

const { Option } = Select

interface IProps {
  searchProducts: (name: string, description: string, category_id: string) => void;
}

const ProductFilters: React.FC<IProps> = ({ searchProducts }: IProps) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    loadCategoriesFilter()
  }, [])

  async function loadCategoriesFilter () {
    try {
      const response = await load()
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

  return (
    <div className="filter-products">
      <Input.Search
        className="input-filter"
        placeholder="Search by name"
        onSearch={(value: string) => searchProducts(value, '', '')}
      />

      <Select
        placeholder="Select a category"
        className="input-filter"
        allowClear
        onChange={(value: string) => searchProducts('', '', value)}
      >
        {
          categories.map(category => (
            <Option value={category.id} key={category.id}>
              { category.name }
            </Option>
          ))
        }
      </Select>

      <Input.Search
        className="input-filter"
        placeholder="Search by description"
        onSearch={(value: string) => searchProducts('', value, '')}
      />
    </div>
  )
}

export default ProductFilters
