import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT, API_VERSION } from '~/utils/constants'
import { mapOrder } from '~/utils/sorts'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatter'

const API_BASE_URL = `${API_ROOT}/${API_VERSION}`

const initialState = {
  currentActiveBoard: null
}

export const fetchActiveBoardAPI = createAsyncThunk(
  'activeBoard/fetchActiveBoardAPI',
  async (boardId) => {
    const response = await axios.get(`${API_BASE_URL}/boards/${boardId}`)
    return response.data
  }
)

// Initial slice in redux store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // reducers are the place where handle synchronous actions, they will update the state in store
  reducers: {
    updateActiveBoard: (state, action) => {
      const fullBoard = action.payload

      state.currentActiveBoard = fullBoard
    }
  },
  // extraReducers are the place where handle asynchronous actions, they will update the state in store
  extraReducers: (builder) => {
    builder.addCase(fetchActiveBoardAPI.fulfilled, (state, action) => {
      // action.payload is response.data from API call
      let board = action.payload

      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
      board.columns.forEach((col) => {
        if (isEmpty(col.cards)) {
          const placeholderCard = generatePlaceholderCard(col)
          col.cards = [placeholderCard]
          col.cardOrderIds = [placeholderCard._id]
        } else {
          col.cards = mapOrder(col.cards, col?.cardOrderIds, '_id')
        }
      })

      state.currentActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateActiveBoard } = activeBoardSlice.actions

export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

export default activeBoardSlice.reducer
