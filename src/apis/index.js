// import axios from 'axios'
import axios from '~/utils/authorizeAxios'
import { API_ROOT, API_VERSION } from '~/utils/constants'
import { toast } from 'react-toastify'
import theme from '~/theme'

const API_BASE_URL = `${API_ROOT}/${API_VERSION}`

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_BASE_URL}/boards/${boardId}`)
  return response
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.patch(
    `${API_BASE_URL}/boards/${boardId}`,
    updateData
  )
  return response
}

export const moveCardToDifferentColumnAPI = async (cardId, updateData) => {
  const response = await axios.patch(
    `${API_BASE_URL}/cards/${cardId}/move`,
    updateData
  )
  return response
}

export const createNewColumnAPI = async (column) => {
  const response = await axios.post(`${API_BASE_URL}/columns`, column)
  return response
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.patch(
    `${API_BASE_URL}/columns/${columnId}`,
    updateData
  )
  return response
}

export const createNewCardAPI = async (card) => {
  const response = await axios.post(`${API_BASE_URL}/cards/`, card)
  return response
}

export const deleteColumnAPI = async (columnId) => {
  const response = await axios.delete(`${API_BASE_URL}/columns/${columnId}`)
  return response
}

export const registerUserAPI = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/users/register`, data)
  toast.success(
    'Account created successfully! Please check and verify account before logging in!'
  )
  return response
}

export const verifyUserAPI = async (data) => {
  const response = await axios.put(`${API_BASE_URL}/users/verify`, data)
  toast.success(
    'Account verified successfully! Now you can login to enjoy our services! Have a good day!'
  )
  return response
}

export const refreshTokenAPI = async () => {
  const response = await axios.get(`${API_BASE_URL}/users/refresh_token`)
  return response
}
