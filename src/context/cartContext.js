import React, { createContext } from 'react'
import useCart from '../hooks/useCart' 
import inventory from '../providers/inventory'

// Holds all the functions and logic required to let the cart feature work.
/* 

Features:

  useCart - Custom Hook for managing Cart state inc. undo history.
  cartContext.cart // Returns all useCart features
  cartContext.inventory // Returns all inventory for now.

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
        cart: useCart(),
        inventory
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
export { CartProvider }
