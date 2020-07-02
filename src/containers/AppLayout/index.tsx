import React, { useState, useEffect, useContext } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons'

import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../../contexts/auth'

import AppRoutes from '../../routes/app'
import MyBreadCrumb from '../../components/MyBreadCrumb'

import './styles.scss'
import ImageProfile from '../../assets/images/man.png'

const { Header, Sider, Content } = Layout

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const location = useLocation()
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    console.log(location.pathname.includes('products'))
  }, [location])

  function logoutApp () {
    logout()
  }

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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={location.pathname.includes('products') ? ['2'] : ['1']}>
            <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
              <Link to="/products">
                Products
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />}>
              <Link to="/categories">
                Categories
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={logout}>
              Log out
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background custom-header" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            })}
            <div className="user-info">
              <img src={ImageProfile} alt="profile"/>
              <span>{ localStorage.getItem('user_app') }</span>
            </div>
          </Header>

          <MyBreadCrumb
            path={location.pathname}
          />

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
