import {  useReducer, useCallback, useEffect } from 'react'
import { inventory } from '../providers/inventory'

// The useCart hook has all cart functionality plus a cart history for undo/redo.

/*
[☑] - addToCart(uid) // Adds item to cart, based on UID. 
[☑] - removeFromCart(uid, nuke) // item to cart, based on UID. Takes an optional second argument that removes all quantity from cart.
[☑] - amendCart(uid, method) // Adds or removes items from cart, based on UID and method, 'add', 'remove' Because why not?
[☑] - clearCart() // Clears cart of all products for a fresh start

[☑] - getProductFromSlug(String!) // getProductFromSlug('comfy-chair-1') 
[☑] - getProductFromId(input) // getProductFromId(uid) 
[☑] - getCartQuantity() // Returns sum of cart quanitities
[☑] - getCartTotalPrice() // Returns sum of cart price 
[☑] - getDetailedCart() // Returns cart with all data pulled from inventory. 


Considerations - 
[☑] - Undo history
[☑] - Local storage for cross-session cart saves

*/

const historyLength = 0 // How much history we'd like to store. Set to 0 for unlimited storage.

const defaultState = {
  past: [],
  cart: [],
  future: []
}

const reducer = (state, action) => {
  const { cart, past, future } = state
  const { uid } = action

  // This was HELL to figure out! I needed to clone a copy of the cart without reference or the history would get updated instead of satay stuck in time
  const copiedCart = cart.map((object) => ({ ...object }))

  // findProductInCart(uid) - Returns a product object by uid
  const findProductInCart = (uid) => {
    return cart.find((product) => product.uid === uid)
  }

  switch (action.type) {
    case 'SET_CART':
      const { newCart, pastCart } = action

      if (newCart === cart) {
        return state
      }

      // Hacky way of making sure we have a totally clear past, instead of  an initial empty array when the cart loads from localStorage
      const setNewPast = pastCart ? pastCart : [ ...past, cart ]

      return {
        past: setNewPast,
        cart: newCart,
        future: []
      }

    case 'CLEAR_HISTORY':
      return {
        ...state,
        past: [],
        future: []
      }

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
      const { nuke } = action // A second argument that when present, removes all quantities from that product

      if (foundProduct) {
        if (foundProduct.quantity === 1 || nuke) {
          const updatedCart = cart.filter((product) => product.uid !== foundProduct.uid)
          console.log('copiedCart :', copiedCart)
          return { ...state, cart: updatedCart, past: [ ...past, copiedCart ] }
        } else {
          foundProduct.quantity -= 1
          return { ...state, cart, past: [ ...past, copiedCart ] }
        }
      }
      return state
  }
}

// useCart Hook

const useCart = () => {
  const [ state, dispatch ] = useReducer(reducer, { ...defaultState })
  const STORAGE_KEY = '_GATSBIFY_STORE'

  useEffect(() => {
    // If we're a returning visitor, we'll want to grab our previous cart, saved in localStorage. Ift not, let's create a localStorage cart.
    // TODO: Store baskets in db and use a token instead of an object
    if (typeof window !== 'undefined') {
      const cartStorage = window.localStorage.getItem(STORAGE_KEY) // Checks localStorage for our cart.

      // if no existing Cart is stored then create and store the default, empty cart.
      if (!cartStorage) {
        console.log('No localStorage - Creating')
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart: state.cart }))
      } else {
        let localCart = JSON.parse(window.localStorage.getItem(STORAGE_KEY)).cart
        console.log('Found Local Storage:', localCart)

        dispatch({ type: 'SET_CART', newCart: localCart, pastCart: [] })
      }
    }
  }, [])

  // useEffect #2 - Every time the cart gets updated, we might as well update the localStorage and our cart History, too.
  useEffect(
    () => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart: state.cart }))
    },
    [ state ]
  )

  // Let's keep our history managable by only allowing X actions to be stored. If historyLength is set to zero, history length is unmanaged.
  if (state.past.length > (historyLength !== 0 ? historyLength : 9999)) {
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

  const getProductFromSlug = (slug) => {
    return inventory.find((p) => p.slug === slug)
  }
  const getProductFromId = (uid) => {
    return inventory.find((product) => product.uid === uid)
  }

  const getDetailedCart = () => {
    let detailedCart = state.cart.map((cartItem) => {
      return {
        ...getProductFromId(cartItem.uid),
        quantity: cartItem.quantity,
        totalPrice: cartItem.quantity * getProductFromId(cartItem.uid).price
      }
    })

    return detailedCart
  }

  const getCartQuantity = () => {
    return state.cart.length === 0
      ? 0
      : state.cart.reduce((a, b) => ({ quantity: a.quantity + b.quantity }), { quantity: 0 }).quantity
  }

  const getCartTotalPrice = () => {
    return state.cart.reduce((a, b) => {
      return a + getProductFromId(b.uid).price * b.quantity
    }, 0)
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
    getCartQuantity,
    getProductFromSlug,
    getProductFromId,
    getDetailedCart,
    getCartTotalPrice
  }
}

export default useCart
