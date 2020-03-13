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

const inventory = [
  { uid: 1001, name: 'comfy chair', slug: 'comfy-chair-1', price: 150, categories: [ 'chair', 'desk', 'gaming' ] },
  { uid: 1002, name: 'notsocomfy chair', slug: 'comfy-chair-2', price: 50, categories: [ 'chair', 'desk', 'ugly' ] },
  { uid: 1003, name: 'notsocomfy chair', slug: 'comfy-chair-2', price: 50, categories: [ 'chair', 'desk', 'dining' ] }
]

// Creates an array of unique categories based on the inventory; might be helpful
const categories = inventory.reduce((a, b) => {
  return [ ...new Set([ ...a, ...b.categories ]) ]
}, [])

const CartContext = createContext(defaultState)
const STORAGE_KEY = '_GATSBIFY_STORE'

const CartProvider = (props) => {
  const [ cart, setCart ] = useState(defaultState.cart)
  const history = useCart({}) // Initialises the cartHistory - Eventually we could make it hold all entire cart logic

  useEffect(() => {
    // If we're a returning visitor, we'll want to grab our previous cart, saved in localStorage.
    // If this is our first session and there's no local storage, let's create it.
    if (typeof window !== 'undefined') {
      const cartStorage = window.localStorage.getItem(STORAGE_KEY) // Checks localStorage for our cart.

      // if no existing Cart is stored then create and store the default, empty cart.
      if (!cartStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState))
      } else {
        setCart(JSON.parse(window.localStorage.getItem(STORAGE_KEY)).cart)
      }
    }
  }, [])

  // Every time the cart gets updated, we might as well update the localStorage and our cart History, too.
  useEffect(
    () => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart }))
    },
    [ cart ]
  )

  const findProductInCart = (uid) => {
    // FUNCTION: findProductInCart(uid)
    // Returns a product object by uid
    return cart.find((product) => product.uid === uid)
  }

  const getProductFromSlug = (slug) => {
    return inventory.find((p) => p.slug === slug)
  }
  const getProductFromId = (uid) => {
    return inventory.find((product) => product.uid === uid)
  }

  const getCartTotalQuantity = () => {
    // Returns the total quantity of products in cart
    return cart.length === 0
      ? 0
      : cart.reduce((a, b) => ({ quantity: a.quantity + b.quantity }), { quantity: 0 }).quantity
  }

  const getCartTotalPrice = () => {
    // Returns the total price of all products in cart
    return cart.reduce((a, b) => {
      return a + getProductFromId(b.uid).price * b.quantity
    }, 0)
  }

  const addToCart = (uid) => {
    const foundProduct = findProductInCart(uid)
    if (foundProduct) {
      foundProduct.quantity += 1
      setCart([ ...cart ])
    } else {
      const updatedCart = [ ...cart, { uid: uid, quantity: 1 } ]
      setCart(updatedCart)
    }
  }

  const removeFromCart = (uid, nuke) => {
    const foundProduct = findProductInCart(uid)
    if (foundProduct && nuke) {
      const updatedCart = cart.filter((product) => product.uid !== foundProduct.uid)
      setCart([ ...updatedCart ])
    } else if (foundProduct) {
      if (foundProduct.quantity === 1) {
        const updatedCart = cart.filter((product) => product.uid !== foundProduct.uid)
        setCart([ ...updatedCart ])
        // window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart: updatedCart }))
      } else {
        foundProduct.quantity -= 1
        setCart([ ...cart ])
        // window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart }))
      }
    }
  }

  const amendCart = (uid, method) => {
    // Adds or Removes a product from cart.
    // uid: Unique Product Id
    // method: 'add', 'remove'

    const foundProduct = findProductInCart(uid)
    // Checks whether product already exists in cart
    if (foundProduct) {
      switch (method) {
        case 'add':
          // ... then increases Quantity
          foundProduct.quantity += 1
          setCart([ ...cart ])
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart }))
          break

        case 'remove':
          // Or decreases / removes item from Cart
          if (foundProduct.quantity === 1) {
            const updatedCart = cart.filter((product) => product.uid !== foundProduct.uid)
            setCart([ ...updatedCart ])
            // window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart: updatedCart }))
          } else {
            foundProduct.quantity -= 1
            setCart([ ...cart ])
            // window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart }))
          }
          break
      }
    } else {
      // Adds an initial product to cart if it doesn't already exist!
      if (method === 'add') {
        const updatedCart = [ ...cart, { uid: uid, quantity: 1 } ]
        setCart(updatedCart)
      }
    }
  }

  const resetCart = () => {
    setCart([])
  }

  const { children } = props

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        amendCart,
        addToCart,
        removeFromCart,
        resetCart,
        getCartTotalQuantity,
        getCartTotalPrice,
        getProductFromSlug,
        getProductFromId,
        history
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
export { CartProvider }
