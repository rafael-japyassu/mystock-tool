import { Category } from './category'
import { Breakpoint } from 'antd/lib/_util/responsiveObserve'

export interface Product {
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

export interface TableColumns {
  title: string;
  dataIndex?: string;
  key: string;
  render?: any;
  responsive?: Breakpoint[];
  width?: string | number;
}
