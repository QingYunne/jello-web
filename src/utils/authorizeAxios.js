import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'

let authorizeAxiosInstance = axios.create()

authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizeAxiosInstance.defaults.withCredentials = true

// Config interceptor
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    interceptorLoadingElements(false)
    let errorMessage = error?.message
    if (error?.response?.data?.message)
      errorMessage = error.response.data.message
    if (error?.response?.status !== 410) toast.error(errorMessage)
    return Promise.reject(error)
  }
)

export default authorizeAxiosInstance
