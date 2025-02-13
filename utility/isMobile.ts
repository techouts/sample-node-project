import { useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'

export const useMobileCheck = (width="(min-width : 600px )") => {
  const [isMobile, setIsMobile] = useState(false)
  const validWidth = typeof width === 'string' ? width : "(min-width: 600px)";
  const isMobileCheck = useMediaQuery(validWidth)
  useEffect(() => {
    setIsMobile(!isMobileCheck)
  }, [isMobileCheck])

  return isMobile
}
