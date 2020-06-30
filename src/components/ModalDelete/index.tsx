import React from 'react'
import { Modal } from 'antd'

interface IProps {
  deleteProduct: () => void;
  visible: boolean;
  cancel: () => void;
  title: string;
  message: string;
}

const ModalDelete: React.FC<IProps> = ({ deleteProduct, visible, cancel, title, message }: IProps) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={deleteProduct}
      okText="Yes"
      okType={'primary'}
      okButtonProps={{ danger: true }}
      onCancel={cancel}
    >
      { message }
    </Modal>
  )
}

export default ModalDelete
