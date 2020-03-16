import { inventory } from '../providers/inventory'
import { useReducer, useCallback } from 'react'

/** useEnhancedEcommerce Hook - Sends datalayer events for GTM */

const CURRENCY = 'GBP'

const reducer = (state, action) => {
  const { uid } = action
  switch (action.type) {
    case 'ADD_REMOVE_CART': {
      // Pushes the relevant event on addToCart and removeFromCart events.
      const { method } = action
      const { name, price, brand, category, variant, dimensions, quantity } = inventory.find(
        (product) => product.uid === uid
      )

      let productObject = {
        id: uid.toString(),
        name,
        price,
        brand,
        category,
        variant,
        position: 0,
        quantity: quantity ? quantity : 1
      }
      // Iterates through each dimension and adds them to our product Object before sending off
      dimensions &&
        dimensions.map((dimension, index) => {
          let dimensionName = `dimension${index + 1}`
          productObject[dimensionName] = dimension
        })

      console.log('DATALAYER EVENT:', method, productObject)

      const ecommerce = {
        currencyCode: CURRENCY
      }

      ecommerce[method] = { products: [ productObject ] }

      window.dataLayer.push({
        event: method,
        ecommerce
      })
      return state
    }
    case 'CLEAR_CART': {
      const { copiedCart: cart } = action

      // For each product in the cart, let's grab their various details and quantities
      const products = cart.map((p, i) => {
        const { uid, name, price, brand, category, variant } = inventory.find((product) => product.uid === p.uid)

        return {
          id: uid,
          name,
          price,
          brand,
          category,
          variant,
          position: i,
          quantity: p.quantity
        }
      })

      const payload = {
        event: 'removeFromCart',
        ecommerce: {
          currencyCode: 'USD',
          remove: {
            products
          }
        }
      }

      console.log('DATALAYER EVENT:', 'clear', payload)

      window.dataLayer.push(payload)
    }
  }
}

const useEnhancedEcommerce = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
  }

  const [ state, dispatch ] = useReducer(reducer, {})

  const addToCart = useCallback(
    (uid) => {
      dispatch({ type: 'ADD_REMOVE_CART', method: 'add', uid })
    },
    [ dispatch ]
  )
  const removeFromCart = useCallback(
    (uid) => {
      dispatch({ type: 'ADD_REMOVE_CART', method: 'remove', uid })
    },
    [ dispatch ]
  )

  const clearCart = useCallback(
    (copiedCart) => {
      dispatch({ type: 'CLEAR_CART', copiedCart })
    },
    [ dispatch ]
  )

  return { addToCart, removeFromCart, clearCart }
}

export default useEnhancedEcommerce
