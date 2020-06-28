import { defaultHeaders } from './api'
import { getRequest } from './defaultService'

const URL = '/categories'

export const load = async (
  headers = defaultHeaders
) => getRequest(`${URL}`, headers)
