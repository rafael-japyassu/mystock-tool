import axios from 'axios'

export const defaultHeaders = {
  'Content-type': 'application/json',
  Authorization: localStorage.getItem('user_token')
}

export const api = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
  headers: defaultHeaders
})
