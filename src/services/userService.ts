import { defaultHeaders } from './api'
import { postRequest } from './defaultService'
import { User } from '../interfaces/user'

const URL = '/users'

export const create = async (
  user: User,
  headers = defaultHeaders
) => postRequest(URL, user, headers)
