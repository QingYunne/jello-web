import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import axios from '~/utils/authorizeAxios'
import { API_BASE_URL } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatter'
import { mapOrder } from '~/utils/sorts'

const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
}

// Initial slice in redux store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    showModalActiveCard: (state, action) => {
      state.isShowModalActiveCard = true
    },
    clearAndHideActiveCard: (state, action) => {
      state.currentActiveCard = null
      state.isShowModalActiveCard = false
    },
    updateActiveCard: (state, action) => {
      state.currentActiveCard = action.payload
    }
  },
  extraReducers: (builder) => {}
})

// Action creators are generated for each case reducer function
export const { updateActiveCard, clearAndHideActiveCard, showModalActiveCard } =
  activeCardSlice.actions

export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}
export const selectIsShowModalActiveCard = (state) => {
  return state.activeCard.isShowModalActiveCard
}

export default activeCardSlice.reducer
