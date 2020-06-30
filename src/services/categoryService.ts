import { defaultHeaders } from './api'
import { getRequest, postRequest, deleteRequest, putRequest } from './defaultService'

const URL = '/categories'

export const load = async (
  headers = defaultHeaders
) => getRequest(`${URL}`, headers)

export const find = async (
  id: string,
  headers = defaultHeaders
) => getRequest(`${URL}/${id}`, headers)

export const save = async (
  category: { name: string },
  headers = defaultHeaders
) => postRequest(`${URL}`, category, headers)

export const update = async (
  id: string,
  category: { name: string },
  headers = defaultHeaders
) => putRequest(`${URL}/${id}`, category, headers)

export const remove = async (
  id: string,
  headers = defaultHeaders
) => deleteRequest(`${URL}/${id}`, headers, null)
