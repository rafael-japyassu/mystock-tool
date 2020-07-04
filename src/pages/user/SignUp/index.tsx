import React, { useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { Card, Input, Form, Button } from 'antd'
import { notification } from '../../../helpers/notification'
import { User } from '../../../interfaces/user'
import { create } from '../../../services/userService'

import './styles.scss'

const SignUp: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  function updateModel (e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  async function onSignup () {
    setLoader(true)
    try {
      await create(user)
      notification('Success', 'Account successfully created!', 'success')
      setTimeout(() => {
        setLoader(false)
      }, 2000)
    } catch (error) {
      setLoader(false)
      if (error.response === undefined) {
        notification('Error', 'Internal server error!', 'danger')
      } else if (error.response.status === 400) {
        notification('Alerta', error.response.data.message, 'warning')
      } else {
        notification('Erro', error.response.data.message, 'danger')
      }
    }
  }

  return (
    <Card className="card-login">
      <div className="logo">
        <h2><strong>My<span>Stock</span> - Sign Up</strong></h2>
      </div>
      <Form
        layout="vertical"
        onFinish={onSignup}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'This field is required!' }]}
        >
          <Input
            type="text"
            required
            name="name"
            value={user.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
          />
        </Form.Item>

        <Form.Item
          label="Email address"
          name="email"
          rules={[{ required: true, message: 'This field is required!', type: 'email' }]}
        >
          <Input
            type="email"
            required
            name="email"
            value={user.email}
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
            value={user.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'This field is required!' }]}
        >
          <Input.Password
            type="password"
            required
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
          />
        </Form.Item>

        <Form.Item>
          Do you already have an account?{' '}
          <Link className="login-form-new" to="/login">
            Log in
          </Link>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loader}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default SignUp
