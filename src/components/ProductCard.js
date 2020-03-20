import React, { createContext, useContext } from 'react'
import CartContext from '../context/cartContext'
const ProductCardContext = createContext()

/*
  Creates a context that contains all the details of the rendered product, based on the uid originally passed through as a prop.
  That detail is available to all nested children inside, as long as you import and use the Consumer. E.g.

  <ProductCard uid="1234"><FancyTitle /></ProductCard>

    const FancyTitle = () => {
    return <ProductCardContext.Consumer>{({product}) => <h1>Check My Fancy {product.name}</h1>}</ProductCardContext.Consumer>
  }
  
 */

const ProductCard = ({ uid, children }) => {
  const { cart } = useContext(CartContext)
  /*
  {
    uid,
    name,
    description,
    price,
    quantity // From cart!
  }
  */

  // TODO: Clean up this horrible mess and create a helper perhaps? (Refactor)
  const details = cart.cart.find((p) => p.uid === uid) ? cart.cart.find((p) => p.uid === uid) : { quantity: 0 }
  const p = { ...cart.getProductFromId(uid), ...details }

  console.log('p :', p);

  return (
    <ProductCardContext.Provider
      value={{
        product: p
      }}
    >
      {children}
    </ProductCardContext.Provider>
  )
}

export default ProductCard
export { ProductCardContext }
