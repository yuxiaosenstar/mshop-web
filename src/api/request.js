import axios from 'axios'
import { serverPath } from './config'

const request = axios.create({
  baseURL: serverPath,
})

request.interceptors.response.use((response) => {
  return response.data
})

export default request
