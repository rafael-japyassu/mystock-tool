/* eslint-disable @typescript-eslint/no-explicit-any */
import { api, defaultHeaders } from './api'

let headers = defaultHeaders

// Adiciona um novo Header
export const setHeaders = (key: string, value: string) => Object.assign(
  headers, { [key]: value }
)

// Retorna às configurações padrões dos headers
export const resetDefaultHeaders = () => {
  headers = defaultHeaders
}

/*
* tipo de requisição: GET
* url: url da requisição
* headersRequest: dados do cabeçalho com valor padrão
* params: parâmetros da requisição
*/
export const getRequest = async (
  url: string,
  headersRequest = headers,
  params = null
) => api.get(url, { headers: headersRequest, params })

/*
* tipo de requisição: POST
* url: url da requisição
* dataObject: corpo da requisição
* headersRequest: dados do cabeçalho com valor padrão
*/
export const postRequest = async (
  url: string,
  data: any,
  headersRequest = headers
) => api.post(url, data, { headers: headersRequest })

/*
* tipo de requisição: PUT
* url: url da requisição
* dataObject: corpo da requisição
* headersRequest: dados do cabeçalho com valor padrão
*/
export const putRequest = async (
  url: string,
  data: any,
  headersRequest = headers
) => api.put(url, data, { headers: headersRequest })

/*
* tipo de requisição: DELETE
* url: url da requisição
* params: parâmetros da requisição
* headersRequest: dados do cabeçalho com valor padrão
*/
export const deleteRequest = async (
  url: string,
  headersRequest = headers,
  params: null
) => api.delete(url, { headers: headersRequest, params })
