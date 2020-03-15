import React, { useContext } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import CartContext from '../context/cartContext'

const IndexPage = () => {
  const { cart } = useContext(CartContext)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <button onClick={() => cart.addToCart(1001)}>Add 1001 Cart</button>
      <button onClick={() => cart.addToCart(1234)}>Add 1234 Cart</button>
      <button onClick={() => cart.removeFromCart(1001)}>Remove 1001 Cart</button>
      <button onClick={() => cart.removeFromCart(1234)}>Remove 1234 Cart</button>
      <button onClick={() => cart.undoCart()}>Undo Cart</button>
      <button onClick={() => cart.redoCart()}>Redo Cart</button>
      <button onClick={() => cart.clearCart()}>Clear Cart</button>

      {cart.getDetailedCart().map((product) => {
        return (
          <div>
            <div>{product.name}</div>
            <div>£{product.price}</div>
            <button onClick={() => cart.removeFromCart(product.uid)}>-</button>
            <div>{product.quantity}</div>
            <button onClick={() => cart.addToCart(product.uid)}>+</button>
            <button onClick={() => cart.removeFromCart(product.uid, true)}>x</button>
          </div>
        )
      })}

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
    </Layout>
  )
}

export default IndexPage
