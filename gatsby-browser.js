// We're wrapping everything in our Providers so we can consume them on all pages
// Eventually we'll have i8n translations in here, too.

import React, { Fragment, useEffect } from 'react'
import CartContext, { CartProvider } from './src/context/cartContext'
import './src/global.css'

export const wrapRootElement = ({ element }) => {
  return (
    <CartProvider>
      {element}

    </CartProvider>
  )
}
