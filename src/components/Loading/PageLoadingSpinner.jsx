import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export default function PageLoadingSpinner({ caption }) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw'
      }}
    >
      <CircularProgress>
        <Typography>{caption}</Typography>
      </CircularProgress>
    </Box>
  )
}
