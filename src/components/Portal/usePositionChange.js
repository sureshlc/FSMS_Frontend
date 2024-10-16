import { useEffect, useState } from "react"

const usePositionChange = (containerRef) => {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  useEffect(() => {
    const handleScroll = (() => {
      const element = containerRef.current
      const elementRect = element.getBoundingClientRect()
      setPosition(elementRect)
    })()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return position
}

export default usePositionChange
