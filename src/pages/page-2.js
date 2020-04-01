import React, { useContext, Fragment } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import CartContext from '../context/cartContext'
import ProductCard from '../components/ProductCard'
import { ProductCardContext } from '../components/ProductCard'

import Drawer from '../components/Common/Drawer'
import Basket from '../components/Basket'

const IndexPage = () => {
  const { cart } = useContext(CartContext)

  // An example of how to a child can consume the context held within <ProductCard/>
  const InnerDetail = ({ cart, i }) => {
    const { product } = useContext(ProductCardContext)
    return (
      <div key={i} style={{ display: 'flex', flexDirection: 'row', margin: '1rem' }}>
        <div>{product.name}</div>
        <div>£{product.price}</div>
        <button onClick={() => cart.removeFromCart(product.uid)}>-</button>
        <div>{product.quantity}</div>
        <button onClick={() => cart.addToCart(product.uid)}>+</button>
        <button onClick={() => cart.removeFromCart(product.uid, true)}>x</button>
      </div>
    )
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div className="container">

        <button onClick={() => cart.addToCart(1001)}>Add 1001 Cart</button>
        <button onClick={() => cart.addToCart(1234)}>Add 1234 Cart</button>
        <button onClick={() => cart.removeFromCart(1001)}>Remove 1001 Cart</button>
        <button onClick={() => cart.removeFromCart(1234)}>Remove 1234 Cart</button>
        <button onClick={() => cart.undoCart()}>Undo Cart</button>
        <button onClick={() => cart.redoCart()}>Redo Cart</button>
        <button onClick={() => cart.clearCart()}>Clear Cart</button>

        {cart.cart.map((product, i) => (
          <ProductCard uid={product.uid} key={i}>
            {/* // These child components can consume the rich product detail from ProductCard. Nice, HOC - Nice. */}
            <InnerDetail cart={cart} />
          </ProductCard>
        ))}

        <p>Undo History: {JSON.stringify(cart.past)}</p>
        <p>Current Cart : {JSON.stringify(cart.getCart())}</p>
        <p>Future Cart : {JSON.stringify(cart.future)}</p>
        <p>Cart Quantity: {cart.getCartQuantity()}</p>
        <p>Detailed Cart: {JSON.stringify(cart.getDetailedCart())}</p>

        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <Link to="/page-2/">Go to page 2</Link>
      </div>
    </Layout>
  )
}

export default IndexPage
