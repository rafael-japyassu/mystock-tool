import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.scss'
import 'react-notifications-component/dist/theme.css'
import App from './App'
import { AuthProvider } from './contexts/auth'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
