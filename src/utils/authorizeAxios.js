import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'
import { refreshTokenAPI } from '~/apis'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'

let authorizeAxiosInstance = axios.create()

authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizeAxiosInstance.defaults.withCredentials = true

let axiosReduxStore
export const injectStore = (store) => {
  axiosReduxStore = store
}

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

let refreshTokenPromise = null

authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false)
    return response.data
  },
  (error) => {
    if (error?.response?.status === 401)
      axiosReduxStore.dispatch(logoutUserAPI(false))
    const originalRequests = error.config
    if (error?.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .catch((_error) => {
            // axiosReduxStore.dispatch(logoutUserAPI(false))
            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      return refreshTokenPromise.then(() =>
        authorizeAxiosInstance(originalRequests)
      )
    }
    interceptorLoadingElements(false)
    let errorMessage = error?.message
    if (error?.response?.data?.message)
      errorMessage = error.response.data.message
    if (error?.response?.status !== 410) toast.error(errorMessage)
    return Promise.reject(error)
  }
)

export default authorizeAxiosInstance
