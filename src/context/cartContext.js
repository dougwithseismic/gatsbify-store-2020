import React, { createContext, useState, useEffect, useMemo } from 'react'
import useCart from '../hooks/useCart'

// Holds all the functions and logic required to let the cart feature work.
/* 

Features:

[☑] - addToCart(uid) // Adds item to cart, based on UID. 
[☑] - removeFromCart(uid, 1?) // item to cart, based on UID. Takes an optional second argument that removes all quantity from cart.
[☑] - amendCart(uid, method) // Adds or removes items from cart, based on UID and method, 'add', 'remove' Because why not?
[☑] - resetCart() // Clears cart
[☑] - getProductFromSlug(String!) // getProductFromSlug('comfy-chair-1') 
[☑] - getProductFromId(input) // getProductFromId(uid) 
[☑] - getCartTotalQuantity() // Returns sum of cart quanitities
[☑] - getCartTotalPrice() // Returns sum of cart price


Considerations - 

[ ] - Undo history for massive user QOL upgrade?
[☑] - Local storage for cross-session cart saves

TODO:
Enhanced Ecommerce events

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
  const STORAGE_KEY = '_GATSBIFY_STORE'
  const cart = useCart([])
  const { children } = props

  useEffect(() => {
    // If we're a returning visitor, we'll want to grab our previous cart, saved in localStorage.
    // If this is our first session and there's no local storage, let's create it.
    if (typeof window !== 'undefined') {
      const cartStorage = window.localStorage.getItem(STORAGE_KEY) // Checks localStorage for our cart.

      // if no existing Cart is stored then create and store the default, empty cart.
      if (!cartStorage) {
        console.log('No localStorage - Creating')
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart: cart.cart }))
      } else {
        console.log('Found Local Storage')

        cart.setCart(JSON.parse(window.localStorage.getItem(STORAGE_KEY)).cart)
      }
    }
  }, [])

  // useEffect #2 - Every time the cart gets updated, we might as well update the localStorage and our cart History, too.
  useEffect(
    () => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart: cart.cart }))
    },
    [ cart ]
  )

  return (
    <CartContext.Provider
      value={{
        cart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
export { CartProvider }
