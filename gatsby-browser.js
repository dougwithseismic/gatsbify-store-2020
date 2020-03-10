// We're wrapping everything in our Providers so we can consume them on all pages
// Eventually we'll have i8n translations in here, too.

import React from 'react'
import { CartProvider } from './src/context/CartContext'

export const wrapRootElement = ({ element }) => <CartProvider>{element}</CartProvider>
