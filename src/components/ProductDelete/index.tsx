import React from 'react'
import { Modal } from 'antd'

interface IProps {
  deleteProduct: () => void;
  visible: boolean;
  cancel: () => void;
}

const ProductDelete: React.FC<IProps> = ({ deleteProduct, visible, cancel }: IProps) => {
  return (
    <Modal
      title="Remove Product"
      visible={visible}
      onOk={deleteProduct}
      okText="Yes"
      okType={'primary'}
      okButtonProps={{ danger: true }}
      onCancel={cancel}
    >
        Do you want to remove this product?
    </Modal>
  )
}

export default ProductDelete
