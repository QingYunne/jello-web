import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'
import axios from '~/utils/authorizeAxios'
import { API_BASE_URL } from '~/utils/constants'

const initialState = {
  currentNotifications: null
}

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationAPI',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/invitations`)
    return response
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ invitationId, status }) => {
    const response = await axios.patch(
      `${API_BASE_URL}/invitations/board/${invitationId}`,
      { status }
    )
    return response
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,

  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    updateCurrentNotification: (state, action) => {
      state.currentNotifications = action.payload
    },
    addNotifications: (state, action) => {
      const incomingInvitation = action.payload
      state.currentNotifications.unshift(incomingInvitation)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitations = action.payload
      state.currentNotifications = Array.isArray(incomingInvitations)
        ? incomingInvitations.reverse()
        : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitations = action.payload
      let getInvitation = state.currentNotifications.find(
        (i) => i._id === incomingInvitations._id
      )
      if (getInvitation) {
        getInvitation.boardInvitation = incomingInvitations.boardInvitation
      }
    })
  }
})

export const {
  clearCurrentNotifications,
  updateCurrentNotification,
  addNotifications
} = notificationsSlice.actions

export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}

export default notificationsSlice.reducer
