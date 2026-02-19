import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function Card({ card }) {
  const { title, memberIds, comments, attachments } = card || {}

  const actionsItems = [
    { data: memberIds, icon: <GroupIcon /> },
    { data: comments, icon: <CommentIcon /> },
    { data: attachments, icon: <AttachmentIcon /> }
  ]
  const visibleActions = actionsItems.filter((item) => item.data?.length > 0)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card._id, data: { ...card } })

  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  }

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: card?.FE_PlaceholderCard ? 'none' : 'unset',
        // display: card?.FE_PlaceholderCard ? 'none' : 'block'
        opacity: card?.FE_PlaceholderCard ? 0 : 1,
        height: card?.FE_PlaceholderCard ? '10px' : 'unset',
        border: '1px solid transparent',
        '&:hover': { borderColor: (theme) => theme.palette.primary.main }
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
