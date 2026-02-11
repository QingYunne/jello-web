import Box from '@mui/material/Box'
import ListColumn from './ListColumn'

export default function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width: '100%',
        height: (theme) => {
          return theme.jello.boardContentHeight
        },
        p: '10px 0'
      }}
    >
      <ListColumn />
    </Box>
  )
}
