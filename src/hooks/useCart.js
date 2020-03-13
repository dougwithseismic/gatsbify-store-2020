import { useState, useReducer, useCallback, useEffect } from 'react'
import inventory from '../providers/inventory'

// The useCart hook has all cart functionality plus a cart history for undo/redo.

/*
[☑] - addToCart(uid) // Adds item to cart, based on UID. 
[☑] - removeFromCart(uid, nuke) // item to cart, based on UID. Takes an optional second argument that removes all quantity from cart.
[☑] - amendCart(uid, method) // Adds or removes items from cart, based on UID and method, 'add', 'remove' Because why not?
[☑] - clearCart() // Clears cart of all products for a fresh start

[☑] - getProductFromSlug(String!) // getProductFromSlug('comfy-chair-1') 
[☑] - getProductFromId(input) // getProductFromId(uid) 
[☑] - getCartTotalQuantity() // Returns sum of cart quanitities
[☑] - getCartTotalPrice() // Returns sum of cart price 


Considerations - 
[ ] - Undo history for massive user QOL upgrade?
[☑] - Local storage for cross-session cart saves

*/

const historyLength = 10 // How much history we'd like to store.

const defaultState = {
  past: [],
  cart: [],
  future: []
}

const reducer = (state, action) => {
  const { cart, past, future } = state
  const { uid } = action

  // This was HELL to figure out! I needed to clone a copy of the cart without reference.
  const copiedCart = cart.map((object) => ({ ...object }))

  const findProductInCart = (uid) => {
    // FUNCTION: findProductInCart(uid)
    // Returns a product object by uid
    return cart.find((product) => product.uid === uid)
  }

  switch (action.type) {
    case 'SET_CART':
      const { newCart } = action

      if (newCart === cart) {
        return state
      }

      return {
        past: [ ...past, cart ],
        cart: newCart,
        future: []
      }

    case 'CLEAR_HISTORY':
      return {
        ...state,
        past: [],
        future: []
      }

    // TODO: Some kind of logic that limits the length of the past / future
    case 'UNDO_CART':
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)

      return {
        ...state,
        past: newPast,
        cart: [ ...previous ],
        future: [ cart, ...future ]
      }

    case 'REDO_CART':
      const next = future[0]
      const newFuture = future.slice(1)

      return {
        past: [ ...past, cart ],
        cart: [ ...next ],
        future: newFuture
      }

    case 'CLEAR_CART':
      // If we already have a blank cart in our last past slot, we dont need any others
      if (past.length > 0 && past[past.length - 1].length === 0) {
        return {
          past: [ ...past ],
          cart: [],
          future: []
        }
      }

      return {
        past: [ ...past, cart ],
        cart: [],
        future: []
      }

    case 'ADD_TO_CART':
      let foundProduct = findProductInCart(uid)

      if (foundProduct) {
        foundProduct.quantity += 1
        return {
          ...state,
          past: [ ...past, [ ...copiedCart ] ],
          future: []
        }
      } else {
        const updatedCart = [ ...cart, { uid: uid, quantity: 1 } ]
        return { ...state, cart: updatedCart, past: [ ...past, [ ...copiedCart ] ] }
      }

    case 'REMOVE_FROM_CART':
      foundProduct = findProductInCart(uid)
      const { nuke } = action.type // A second argument that when present, removes all quantities from that product

      if (foundProduct) {
        if (foundProduct.quantity === 1 || nuke) {
          const updatedCart = cart.filter((product) => product.uid !== foundProduct.uid)
          return { ...state, cart: updatedCart, past: [ ...past, ...copiedCart ] }
        } else {
          foundProduct.quantity -= 1
          return { ...state, cart, past: [ ...past, copiedCart ] }
        }
      }
      return state
  }
}

// useCart Hook

const useCart = (initialCart) => {
  const [ state, dispatch ] = useReducer(reducer, { ...defaultState })
  console.log('state :', state)

  // Let's keep our history managable by only allowing X actions to be stored!
  if (state.past.length > historyLength) {
    state.past.shift()
  }

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0


  const clearHistory = useCallback(
    () => {
      dispatch({ type: 'CLEAR_HISTORY' })
    },
    [ dispatch ]
  )

  const getCart = () => {
    return state.cart
  }

  // DONT USE SETCART TO CLEAR A CART. USE clearCart() instead
  const setCart = useCallback(
    (newCart) => {
      dispatch({ type: 'SET_CART', newCart })
    },
    [ dispatch ]
  )

  const undoCart = useCallback(
    () => {
      if (canUndo) {
        dispatch({ type: 'UNDO_CART' })
      }
    },
    [ canUndo, dispatch ]
  )

  const redoCart = useCallback(
    () => {
      if (canRedo) {
        dispatch({ type: 'REDO_CART' })
      }
    },
    [ canRedo, dispatch ]
  )

  const clearCart = useCallback(
    () => {
      dispatch({ type: 'CLEAR_CART' })
    },
    [ canRedo, dispatch ]
  )
  const addToCart = useCallback(
    (uid) => {
      dispatch({ type: 'ADD_TO_CART', uid })
    },
    [ dispatch ]
  )

  const removeFromCart = useCallback(
    (uid, nuke) => {
      dispatch({ type: 'REMOVE_FROM_CART', uid, nuke })
    },
    [ dispatch ]
  )

  const getCartTotalQuantity = () => {
    // Returns the total quantity of products in cart
    return state.cart.length === 0
      ? 0
      : state.cart.reduce((a, b) => ({ quantity: a.quantity + b.quantity }), { quantity: 0 }).quantity
  }

  return {
    cart: state.cart,
    past: state.past,
    future: state.future,
    clearHistory,
    undoCart,
    redoCart,
    clearCart,
    setCart,
    addToCart,
    removeFromCart,
    getCart,
    getCartTotalQuantity
  }
}

export default useCart
