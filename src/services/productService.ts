import { defaultHeaders } from './api'
import { getRequest, deleteRequest, postRequest, putRequest } from './defaultService'
import { ProductFormInterface } from '../interfaces/product'

const URL = '/products'

export const load = async (
  headers = defaultHeaders
) => getRequest(`${URL}`, headers)

export const find = async (
  id: string,
  headers = defaultHeaders
) => getRequest(`${URL}/${id}`, headers)

export const save = async (
  product: ProductFormInterface,
  headers = defaultHeaders
) => postRequest(`${URL}`, product, headers)

export const update = async (
  id: string,
  product: ProductFormInterface,
  headers = defaultHeaders
) => putRequest(`${URL}/${id}`, product, headers)

export const filters = async (
  params: any,
  headers = defaultHeaders
) => getRequest(`${URL}/filter`, headers, params)

export const remove = async (
  id: string,
  headers = defaultHeaders
) => deleteRequest(`${URL}/${id}`, headers, null)
