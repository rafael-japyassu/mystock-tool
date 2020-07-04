import { Category } from './category'
import { Breakpoint } from 'antd/lib/_util/responsiveObserve'

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  created_at?: Date;
  updated_at?: Date;
}
export interface ProductTable {
  key: string;
  id: string;
  name: string;
  description: string;
  price: number;
  stock: string;
  category_id: string;
  category: Category;
  responsive: Breakpoint[]
}

export interface ProductFormInterface {
  name: string;
  description: string;
  price?: number;
  stock: number;
  category_id: string;
}

export interface TableColumns {
  title: string;
  dataIndex?: string;
  key: string;
  render?: any;
  responsive?: Breakpoint[];
  width?: string | number;
  align?: 'left' | 'right' | 'center';
}

export interface PaginationParams {
  name: string;
  description: string;
  category_id: string;
  size: number;
  page: number;
}
