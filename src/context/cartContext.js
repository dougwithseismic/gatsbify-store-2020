import React, { createContext } from 'react'
import useCart from '../hooks/useCart'

// Holds all the functions and logic required to let the cart feature work.
/* 

Features:

  useCart - Custom Hook for managing Cart state inc. undo history and Side Drawer

*/

const defaultState = {
  cart: []
}

// Creates an array of unique categories based on the inventory; might be helpful
// const categories = inventory.reduce((a, b) => {
//   return [ ...new Set([ ...a, ...b.categories ]) ]
// }, [])

const CartContext = createContext(defaultState)

const CartProvider = (props) => {
  const { children } = props

  return (
    <CartContext.Provider
      value={{
        cart: useCart()
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
export { CartProvider }
