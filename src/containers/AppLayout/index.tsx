import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons'

import './styles.scss'
import { Link } from 'react-router-dom'

import AppRoutes from '../../routes/app'

// const { SubMenu } = Menu
const { Header, Sider, Content } = Layout

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <div id="app-layout">
      <Layout className="page-layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h2 style={{ color: '#fff' }}>
              {
                collapsed ? 'MS'
                  : 'MyStock'
              }
            </h2>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
              <Link to="/products">
              Products
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />}>
              Categories
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />}>
              Log out
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            })}
          </Header>
          <Breadcrumb style={{ margin: '16px 16px 0px' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Content
          >
            <div className="main-content">

              <AppRoutes />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default AppLayout
