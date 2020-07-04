import React from 'react'
import { Row, Col } from 'antd'

import './styles.scss'
import UserRoutes from '../../routes/user'

const UserLayout: React.FC = () => {
  return (
    <div id="user-layout">
      <Row justify="center" align="middle">
        <Col lg={12} md={12} sm={0} xs={0}>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24} className="col-form">
          <UserRoutes />
        </Col>
      </Row>
    </div>
  )
}

export default UserLayout
