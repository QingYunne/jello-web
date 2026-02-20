import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
// import { mockData } from '~/apis/mock-data'
import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatter'
import { isEmpty } from 'lodash'

export default function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6993ebfbd3eba4705c10274c'
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns.forEach((col) => {
        if (isEmpty(col.cards)) {
          const placeholderCard = generatePlaceholderCard(col)
          col.cards = [placeholderCard]
          col.cardOrderIds = [placeholderCard._id]
        }
      })
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (column) => {
    const createdColumn = await createNewColumnAPI({
      ...column,
      boardId: board._id
    })

    if (isEmpty(createdColumn.cards)) {
      const placeholderCard = generatePlaceholderCard(createdColumn)
      createdColumn.cards = [placeholderCard]
      createdColumn.cardOrderIds = [placeholderCard._id]
    }

    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (card) => {
    const createdCard = await createNewCardAPI({
      ...card,
      boardId: board._id
    })

    const newBoard = { ...board }
    const foundColumn = newBoard.columns.find(
      (col) => col._id === createdCard.columnId
    )
    if (foundColumn) {
      foundColumn.cards.push(createdCard)
      foundColumn.cardOrderIds.push(createdCard._id)
      setBoard(newBoard)
    }
  }

  return (
    <>
      <Container disableGutters maxWidth="false" sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent
          board={board}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
      </Container>
    </>
  )
}
