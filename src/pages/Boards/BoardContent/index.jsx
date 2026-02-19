import {
  DndContext,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitSensors'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { cloneDeep, isEmpty } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { generatePlaceholderCard } from '~/utils/formatter'
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
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null)

  // Điểm va chạm cuối cùng
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(
      e?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(e?.active?.data?.current)
    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id))
    }
  }

  const moveCardBetweenDiffColumn = (
    overColumn,
    overCardId,
    over,
    active,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      )

      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(
        (col) => col._id === activeColumn._id
      )
      const nextOverColumn = nextColumns.find(
        (col) => col._id === overColumn._id
      )

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )

        if (isEmpty(nextActiveColumn?.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        )
      }
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )

        const rebuildActiveDraggingCardData = {
          ...activeDraggingCardData
        }

        // Cập nhật column id trong card
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuildActiveDraggingCardData
        )
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_PlaceholderCard
        )
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id,
          { ...activeDraggingCardData, columnId: overColumn._id }
        )
      }
      console.log('nextColumns: ', nextColumns)

      return nextColumns
    })
  }

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((col) =>
      col?.cards?.map((card) => card._id)?.includes(cardId)
    )
  }

  const handleDragOver = (e) => {
    // console.log('HandleDragOver', e)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = e
    if (!active || !over) return
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    // Find Card's column
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return

    if (activeColumn._id === overColumn._id) return

    moveCardBetweenDiffColumn(
      overColumn,
      overCardId,
      over,
      active,
      activeColumn,
      activeDraggingCardId,
      activeDraggingCardData
    )
  }

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        return closestCorners(args)

      // tìm các điểm giao nhau với con trỏ
      const pointerIntersections = pointerWithin(args)

      if (!pointerIntersections?.length) return

      // const intersections =
      //   pointerIntersections?.length > 0
      //     ? pointerIntersections
      //     : rectIntersection(args)

      let overId = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        const checkColumn = orderedColumns.find((col) => col._id === overId)
        if (checkColumn) {
          return closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkColumn?.cardOrderIds?.includes(container.id)
                )
              }
            )
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )

  const handleDragEnd = (e) => {
    const { active, over } = e
    if (!active || !over) return
    // const {
    //   id: activeDraggingCardId,
    //   data: { current: activeDraggingCardData }
    // } = active
    // const { id: overCardId } = over

    // Drag vào vùng ko hợp lệ => return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Tạm thời chưa xử lý')

      const { active, over } = e
      if (!active || !over) return
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over

      // Find Card's column
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDiffColumn(
          overColumn,
          overCardId,
          over,
          active,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // Kéo thả card trong cùng column
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === active.id
        )
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === over.id
        )

        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard.cards,
          oldCardIndex,
          newCardIndex
        )

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns)

          const targetColumn = nextColumns.find((c) => c._id === overColumn._id)

          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map((c) => c._id)

          return nextColumns
        })
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id === over.id) return

      // Xử lý kéo thả COLUMN
      const oldColumnIndex = orderedColumns.findIndex(
        (c) => c._id === active.id
      )
      const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id)

      // swap các object column
      const dndOrderedColumns = arrayMove(
        orderedColumns,
        oldColumnIndex,
        newColumnIndex
      )
      // swap thứ tự các icon
      const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id)
      // console.log('dndOrderedColumns:', dndOrderedColumns)
      // console.log('dndOrderedColumnIds:', dndOrderedColumnIds)
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemData(null)
    setActiveDragItemType(null)
    setOldColumnWhenDraggingCard(null)
  }

  // console.log('activeDragItemId', activeDragItemId)
  // console.log('activeDragItemType', activeDragItemType)
  // console.log('activeDragItemData', activeDragItemData)

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  return (
    <DndContext
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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
