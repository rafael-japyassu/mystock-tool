import { Breakpoint } from 'antd/lib/_util/responsiveObserve'

export interface Category {
  id: string;
  name: string;
}

export interface CategoryTable {
  key: string;
  id: string;
  name: string;
  responsive: Breakpoint[]
}
