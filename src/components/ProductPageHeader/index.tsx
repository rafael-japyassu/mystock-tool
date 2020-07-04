import React from 'react'
import { Button } from 'antd'

interface IProps {
  title?: string;

  action1Title: string;
  action1Icon: React.ReactNode;
  action1: () => void;

  action2Title: string;
  action2Icon: React.ReactNode;
  action2: () => void;
}

const ProductPageHeader: React.FC<IProps> = ({
  title,
  action1Title,
  action1,
  action1Icon,
  action2Title,
  action2,
  action2Icon
}: IProps) => {
  return (
    <div className="product-list-header">
      <h2>{ title }</h2>
      <div>
        <Button type="primary" icon={ action1Icon } onClick={action1}>{ action1Title }</Button>{' '}
        <Button type="primary" icon={ action2Icon } onClick={action2}>{ action2Title }</Button>
      </div>
    </div>
  )
}

export default ProductPageHeader
