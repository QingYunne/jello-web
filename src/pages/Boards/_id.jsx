import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI } from '~/apis'

export default function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6993ebfbd3eba4705c10274c'
    fetchBoardDetailsAPI(boardId).then((board) => setBoard(board))
  }, [])

  return (
    <>
      <Container disableGutters maxWidth="false" sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent board={board} />
      </Container>
    </>
  )
}
