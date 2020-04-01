import React, { useContext, useEffect } from 'react'
import './drawer.scss'

import CartContext from './../../../context/cartContext'

/**
 * <Drawer>{children}</Drawer>
 * Renders a drawer that can be opened and closed 
 * @param {bool} isOpen - Whether the drawer is open or not.
 * @param {string} openedClass - The class given to an opened Drawer.
 * @param {string} closedClass - The class given to a closed Drawer.
 * 
 */

const Drawer = ({  openedClass, closedClass, children }) => {
  const { cart } = useContext(CartContext)
  const isOpen = cart.isDrawerOpen

  // After .2 seconds, switch the black overlay to display none so we can click through it.
  // This gives us enough time to fade out properly.
  useEffect(
    () => {
      const id = document.querySelector('.cart-drawer-overlay')
      let timer = null

      if (!cart.isDrawerOpen) {
        timer = setTimeout(() => {
          id.style.display = 'none'
        }, 200)
      } else {
        id.style.display = 'block'
      }

      return () => clearTimeout(timer)
    },
    [ cart.isDrawerOpen ]
  )

  return (
    <div className="cart-drawer-container">
      <div className={`cart-drawer ${isOpen ? openedClass : closedClass}`}>{children}</div>
      <div
        className={`cart-drawer-overlay ${isOpen ? 'overlay-open' : 'overlay-closed'}`}
        onClick={() => cart.setDrawer(!cart.isDrawerOpen)}
      />
    </div>
  )
}



export default Drawer
