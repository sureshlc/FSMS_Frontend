import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import usePositionChange from './usePositionChange'

const Portal = ({ children }) => {
  const [portalContainer, setPortalContainer] = useState(null)

  useEffect(() => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    setPortalContainer(container)

    return () => {
      document.body.removeChild(container)
    }
  }, [])

  if (!portalContainer) {
    return null
  }

  return createPortal(children, portalContainer)
}

export { Portal }

export const PositionedPortal = ({ isOpen, position, children }) => {
  return (
    <Portal>
      <ItemsContainerForPortal
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          minWidth: position.width
        }}
        open={isOpen}
      >
        {children}
      </ItemsContainerForPortal>
    </Portal>
  )
}

const ItemsContainerForPortal = styled.div`
  transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out,transform 0.3s ease-in-out;
  z-index:1000;
  ${({ open }) =>
    open
      ? `
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    `
      : `
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    `}
`

export { usePositionChange }
