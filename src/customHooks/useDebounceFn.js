import { useCallback } from 'react'
import { debounce } from '@mui/material'

export const useDebounceFn = (fn, delay = 500) => {
  if (isNaN(delay)) throw new Error('Delay value should be a number!')
  if (!fn || typeof fn !== 'function')
    throw new Error('Debounce must have a function!')
  return useCallback(debounce(fn, delay), [fn, delay])
}
