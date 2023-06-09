import { useEffect, useRef } from 'react'

export default function useOnChange<T>(
  value: T,
  effect: (prev: T, next: T) => void
) {
  const latestValue = useRef(value)
  const callback = useRef(effect)
  callback.current = effect

  useEffect(
    function onChange() {
      if (value !== latestValue.current) {
        callback.current(latestValue.current, value)
      }
    },
    [value]
  )
}