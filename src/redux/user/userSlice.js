import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'
import axios from '~/utils/authorizeAxios'
import { API_ROOT, API_VERSION } from '~/utils/constants'
import { toast } from 'react-toastify'

const API_BASE_URL = `${API_ROOT}/${API_VERSION}`

const initialState = {
  currentUser: null
}

export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, data)
    return response
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await axios.post(`${API_BASE_URL}/users/logout`)
    if (showSuccessMessage) toast.success('Logged out successfully!')
    return response
  }
)

// Initial slice in redux store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state, action) => {
      state.currentUser = null
    })
  }
})

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export default userSlice.reducer
