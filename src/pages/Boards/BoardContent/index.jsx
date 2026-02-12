import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils/sorts'
import ListColumn from './ListColumn'
import Column from './ListColumn/Column'
import Card from './ListColumn/Column/ListCard/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

export default function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 }
  // })
  // Require: distance > 10 px => activate sensor
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 }
  })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  // cùng 1 thời điểm chỉ có 1 phần từ đang kéo
  const [activeDragItemId, setActiveDragItemId] = useState([])
  const [activeDragItemType, setActiveDragItemType] = useState([])
  const [activeDragItemData, setActiveDragItemData] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board.columns, board.columnOrderIds, '_id'))
  }, [board])

  const handleDragStart = (e) => {
    console.log('Handle drag start: ', e)
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(
      e?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(e?.active?.data?.current)
  }

  const handleDragEnd = (e) => {
    console.log('activeDragItemId', activeDragItemId)
    console.log('activeDragItemType', activeDragItemType)
    console.log('activeDragItemData', activeDragItemData)

    // console.log('handle drag end: ', e)
    const { active, over } = e

    // Drag vào vùng ko hợp lệ => return
    if (!over) return
    if (active.id === over.id) return

    // Xử lý kéo thả COLUMN
    const oldIndex = orderedColumns.findIndex((c) => c._id === active.id)
    const newIndex = orderedColumns.findIndex((c) => c._id === over.id)

    // swap các object column
    const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
    // swap thứ tự các icon
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id)
    // console.log('dndOrderedColumns:', dndOrderedColumns)
    // console.log('dndOrderedColumnIds:', dndOrderedColumnIds)
    setOrderedColumns(dndOrderedColumns)

    setActiveDragItemId(null)
    setActiveDragItemData(null)
    setActiveDragItemType(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
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
        <ListColumn columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}
