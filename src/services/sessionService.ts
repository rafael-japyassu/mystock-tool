import { defaultHeaders } from './api'
import { postRequest } from './defaultService'
import { Auth } from '../interfaces/auth'

const URL = '/session'

export const session = async (
  data: Auth,
  headers = defaultHeaders
) => postRequest(URL, data, headers)
