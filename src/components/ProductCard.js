import React, { createContext } from 'react'

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
  const getProductDetails = (uid) => {
    return { uid: 1234, name: 'Comfy chair', description: 'Wow what a chair!', price: 125 }
  }

  return (
    <ProductCardContext.Provider
      value={{
        product: getProductDetails(uid)
      }}
    >
      {children}
    </ProductCardContext.Provider>
  )
}

export default ProductCard
export { ProductCardContext }
