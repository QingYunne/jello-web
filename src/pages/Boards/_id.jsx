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
import { mockData } from '~/apis/mock-data'

export default function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6993ebfbd3eba4705c10274c'
    fetchBoardDetailsAPI(boardId).then((board) => setBoard(board))
  }, [])

  const createNewColumn = async (column) => {
    const createdColumn = await createNewColumnAPI({
      ...column,
      boardId: board._id
    })
  }

  const createNewCard = async (card) => {
    const createdCard = await createNewCardAPI({
      ...card,
      boardId: board._id
    })
  }

  return (
    <>
      <Container disableGutters maxWidth="false" sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={mockData.board} />
        <BoardContent
          board={mockData.board}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
      </Container>
    </>
  )
}
