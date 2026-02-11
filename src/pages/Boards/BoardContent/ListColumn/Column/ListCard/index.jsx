import Box from '@mui/material/Box'
import Card from './Card'

export default function ListCard({ cards }) {
  return (
    <Box
      sx={{
        p: '0 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) =>
          `calc(${theme.jello.boardContentHeight} - ${theme.spacing(5)} - ${theme.jello.columnFooterHeight} - ${theme.jello.columnHeaderHeight})`,
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da',
          borderRadius: '8px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf',
          borderRadius: '8px'
        }
      }}
    >
      {cards?.map((card) => (
        <Card key={card?._id} card={card} />
      ))}
    </Box>
  )
}
