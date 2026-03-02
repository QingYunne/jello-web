import Container from '@mui/material/Container'
import { useEffect } from 'react'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'

// import { mockData } from '~/apis/mock-data'
import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  // fetchBoardDetailsAPI,
  moveCardToDifferentColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import {
  fetchActiveBoardAPI,
  selectCurrentActiveBoard,
  updateActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

export default function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const { boardId } = useParams()

  useEffect(() => {
    // const boardId = '6993ebfbd3eba4705c10274c'
    dispatch(fetchActiveBoardAPI(boardId))
  }, [dispatch])

  const moveColumns = async (dndOrderedColumnIds, dndOrderedColumns) => {
    const newBoard = { ...board }
    newBoard.columnOrderIds = dndOrderedColumnIds
    newBoard.columns = dndOrderedColumns
    await updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds
    })
    dispatch(updateActiveBoard(newBoard))
  }

  const moveCardToTheSameColumn = async (
    dndOrderedCardIds,
    dndOrderedCards,
    columnId
  ) => {
    const newBoard = cloneDeep(board)
    const foundColumn = newBoard.columns.find((col) => col._id === columnId)
    if (foundColumn) {
      foundColumn.cardOrderIds = dndOrderedCardIds
      foundColumn.cards = dndOrderedCards
      await updateColumnDetailsAPI(columnId, {
        cardOrderIds: foundColumn.cardOrderIds
      })
      dispatch(updateActiveBoard(newBoard))
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

    dispatch(updateActiveBoard(newBoard))
  }

  if (!board) {
    return <PageLoadingSpinner caption={'Loading Boards...'} />
  }

  return (
    <>
      <Container disableGutters maxWidth="false" sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent
          board={board}
          moveColumns={moveColumns}
          moveCardToTheSameColumn={moveCardToTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
        />
      </Container>
    </>
  )
}
