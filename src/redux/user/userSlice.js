import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'
import { toast } from 'react-toastify'
import axios from '~/utils/authorizeAxios'
import { API_BASE_URL } from '~/utils/constants'

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

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await axios.patch(`${API_BASE_URL}/users`, data)
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
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
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
