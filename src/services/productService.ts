import { defaultHeaders } from './api'
import { getRequest, deleteRequest } from './defaultService'

const URL = '/products'

export const load = async (
  headers = defaultHeaders
) => getRequest(`${URL}`, headers)

export const filters = async (
  params: any,
  headers = defaultHeaders
) => getRequest(`${URL}/filter`, headers, params)

export const remove = async (
  id: string,
  headers = defaultHeaders
) => deleteRequest(`${URL}/${id}`, headers, null)
