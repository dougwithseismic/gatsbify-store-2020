// We're wrapping everything in our Providers so we can consume them on all pages
// Eventually we'll have i8n translations in here, too.

import React, { Fragment, useEffect } from 'react'
import CartContext, { CartProvider } from './src/context/cartContext'
import './src/global.css'
import Drawer from './src/components/Common/Drawer'
import Basket from './src/components/Basket'

export const wrapRootElement = ({ element }) => {
  return (
    <CartProvider>
      <CartContext.Consumer>
        {({ cart }) => {
          return (
            <Drawer isOpen={cart.isDrawerOpen} openedClass="cart-drawer-open" closedClass="cart-drawer-closed">
              <Basket />
            </Drawer>
          )
        }}
      </CartContext.Consumer>

      {element}
    </CartProvider>
  )
}
