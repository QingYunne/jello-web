import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
// import { mockData } from '~/apis/mock-data'
import { isEmpty } from 'lodash'
import {
  createNewCardAPI,
  createNewColumnAPI,
  deleteColumnAPI,
  fetchBoardDetailsAPI,
  moveCardToDifferentColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatter'
import { mapOrder } from '~/utils/sorts'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'

export default function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6993ebfbd3eba4705c10274c'
    fetchBoardDetailsAPI(boardId).then((board) => {
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
      if (foundColumn.cards.some((card) => card.FE_PlaceholderCard)) {
        foundColumn.cards = [createdCard]
        foundColumn.cardOrderIds = [createdCard._id]
      } else {
        foundColumn.cards.push(createdCard)
        foundColumn.cardOrderIds.push(createdCard._id)
      }
      setBoard(newBoard)
    }
  }

  const moveColumns = async (dndOrderedColumnIds, dndOrderedColumns) => {
    const newBoard = { ...board }
    newBoard.columnOrderIds = dndOrderedColumnIds
    newBoard.columns = dndOrderedColumns
    await updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds
    })
    setBoard(newBoard)
  }

  const moveCardToTheSameColumn = async (
    dndOrderedCardIds,
    dndOrderedCards,
    columnId
  ) => {
    const newBoard = { ...board }
    const foundColumn = newBoard.columns.find((col) => col._id === columnId)
    if (foundColumn) {
      foundColumn.cardOrderIds = dndOrderedCardIds
      foundColumn.cards = dndOrderedCards
      await updateColumnDetailsAPI(columnId, {
        cardOrderIds: foundColumn.cardOrderIds
      })
      setBoard(newBoard)
    }
  }

  const moveCardToDifferentColumn = async (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((col) => col._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    await moveCardToDifferentColumnAPI(currentCardId, {
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds
    })

    setBoard(newBoard)
  }

  const deleteColumn = async (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter((col) => col._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (id) => id !== columnId
    )
    deleteColumnAPI(columnId).then((res) => {
      toast.success(res?.deleteResult)
    })
    setBoard(newBoard)
  }

  if (!board) {
    return (
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          margin: 0
        }}
      >
        <CircularProgress /> {/* @mui/material */}
      </Container>
    )
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
          moveColumns={moveColumns}
          moveCardToTheSameColumn={moveCardToTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
          deleteColumn={deleteColumn}
        />
      </Container>
    </>
  )
}
