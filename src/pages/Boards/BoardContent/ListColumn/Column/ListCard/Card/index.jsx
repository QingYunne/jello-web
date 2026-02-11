import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

export default function Card({ card }) {
  const { title, memberIds, comments, attachments } = card || {}

  const actionsItems = [
    { data: memberIds, icon: <GroupIcon /> },
    { data: comments, icon: <CommentIcon /> },
    { data: attachments, icon: <AttachmentIcon /> }
  ]

  const visibleActions = actionsItems.filter((item) => item.data?.length > 0)
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card.cover} />}
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{title ? title : 'untitled'}</Typography>
      </CardContent>
      {visibleActions.length > 0 && (
        <CardActions sx={{ p: '0 4px 8px' }}>
          {visibleActions.map((item, index) => (
            <Button key={index} size="small" startIcon={item.icon}>
              {item.data.length}
            </Button>
          ))}
        </CardActions>
      )}
    </MuiCard>
  )
}
