import React, { useState, ChangeEvent, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Input, Form, Button } from 'antd'
import { Auth } from '../../../interfaces/auth'
import { session } from '../../../services/sessionService'
import { notification } from '../../../helpers/notification'
import AuthContext from '../../../contexts/auth'

import './styles.scss'

const Login: React.FC = () => {
  const { signin } = useContext(AuthContext)

  const [loader, setLoader] = useState<boolean>(false)
  const [auth, setAuth] = useState<Auth>({
    email: '',
    password: ''
  })

  function updateModel (e: ChangeEvent<HTMLInputElement>) {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value
    })
  }

  async function onSignin () {
    setLoader(true)
    try {
      const response = await session(auth)
      setTimeout(() => {
        setLoader(false)
        signin(response.data)
      }, 1000)
    } catch (error) {
      setLoader(false)
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
    <Card className="card-login">
      <div className="logo">
        <h2><strong>My<span>Stock</span> - Log in</strong></h2>
      </div>
      <Form
        layout="vertical"
        onFinish={onSignin}
      >
        <Form.Item
          label="Email address"
          name="email"
          rules={[{ required: true, message: 'This field is required!', type: 'email' }]}
        >
          <Input
            type="email"
            required
            name="email"
            value={auth.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'This field is required!' }]}
        >
          <Input.Password
            type="password"
            required
            name="password"
            value={auth.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
          />
        </Form.Item>
        <Form.Item>
          {'Don\'t'} have an account?{' '}
          <Link className="login-form-new" to="/sign-up">
            Sign up
          </Link>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loader}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Login
