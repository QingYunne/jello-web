import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'
import { isEmpty } from 'lodash'
import axios from '~/utils/authorizeAxios'
import { API_BASE_URL } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatter'
import { mapOrder } from '~/utils/sorts'

const initialState = {
  currentActiveBoard: null
}

export const fetchActiveBoardAPI = createAsyncThunk(
  'activeBoard/fetchActiveBoardAPI',
  async (boardId) => {
    const response = await axios.get(`${API_BASE_URL}/boards/${boardId}`)
    return response
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
    },
    updateCardInBoard: (state, action) => {
      const incomingCard = action.payload
      const column = state.currentActiveBoard.columns.find(
        (col) => col._id === incomingCard.columnId
      )
      if (column) {
        const cardIndex = column.cards.findIndex(
          (card) => card._id === incomingCard._id
        )
        if (cardIndex !== -1) {
          column.cards[cardIndex] = incomingCard
        }
      }
    }
  },
  // extraReducers are the place where handle asynchronous actions, they will update the state in store
  extraReducers: (builder) => {
    builder.addCase(fetchActiveBoardAPI.fulfilled, (state, action) => {
      // action.payload is response.data from API call
      let board = action.payload

      board.FE_allUsers = board.owners.concat(board.members)

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
export const { updateActiveBoard, updateCardInBoard } = activeBoardSlice.actions

export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

export default activeBoardSlice.reducer
