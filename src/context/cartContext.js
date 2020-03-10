import React, { createContext, useState, useEffect } from 'react'

// Holds all the functions and logic required to let the cart feature work.
/* 

Features:

[☑] - amendCart(uid, method) // Adds or removes items from cart, based on UID. 
[☑] - resetCart() // Clears cart
[ ] - getProduct(input, method?) // getProduct(uid) or getProduct('fancy-green-turtleneck', 'slug')
[☑] - getTotalCartQuantity() // Returns sum of cart quanitities


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
  { uid: 1003, name: 'Just right chair', slug: 'comfy-chair-3', price: 87.5, categories: [ 'chair', 'desk', 'gaming' ] }
]

const CartContext = createContext(defaultState)
const STORAGE_KEY = '_GATSBIFY_STORE'

const CartProvider = (props) => {
  const [ cart, setCart ] = useState(defaultState.cart)

  useEffect(() => {
    // If we're a returning visitor, we'll want to grab our previous cart, saved in localStorage.
    // If this is our first session and there's no local storage, let's create it.
    if (typeof window !== 'undefined') {
      const cartStorage = window.localStorage.getItem(STORAGE_KEY) // Checks localStorage for our cart.

      // if no existing Cart is stored then set it as a default.
      if (!cartStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState))
      } else {
        setCart(JSON.parse(window.localStorage.getItem(STORAGE_KEY)).cart)
      }
    }
  }, [])

  // Every time the cart gets updated, we might as well update the localStorage too.
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
    return inventory.filter((p) => p.slug === slug)[0]
  }

  const getProductFromId = (id) => {
    return inventory.filter((product) => product.id === id)[0]
  }

  // Returns the total quantity of products in cart
  const getTotalCartQuantity = () => {
    return cart.length === 0
      ? 0
      : cart.reduce((a, b) => ({ quantity: a.quantity + b.quantity }), { quantity: 0 }).quantity
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
        amendCart,
        resetCart,
        getTotalCartQuantity,
        getProductFromSlug,
        getProductFromId
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
export { CartProvider }
