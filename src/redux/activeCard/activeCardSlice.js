import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import axios from '~/utils/authorizeAxios'
import { API_BASE_URL } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatter'
import { mapOrder } from '~/utils/sorts'

const initialState = {
  currentActiveCard: null
}

// Initial slice in redux store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    clearActiveCard: (state, action) => {
      state.currentActiveCard = null
    },
    updateActiveCard: (state, action) => {
      state.currentActiveCard = action.payload
    }
  },
  extraReducers: (builder) => {}
})

// Action creators are generated for each case reducer function
export const { updateActiveCard, clearActiveCard } = activeCardSlice.actions

export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

export default activeCardSlice.reducer
