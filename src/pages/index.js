import React, { useContext } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import CartContext from '../context/CartContext'

const IndexPage = () => {
  const cartContext = useContext(CartContext)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>{JSON.stringify(cartContext.cart)}.</p>
      <button onClick={() => cartContext.amendCart(1001, 'add')}>Add Product 1001 to Card</button>
      <button onClick={() => cartContext.amendCart(1002, 'add')}>Add Product 1002 to Card</button>
      <button onClick={() => cartContext.amendCart(1001, 'remove')}>Remove Product 1001 to Card</button>
      <button onClick={() => cartContext.amendCart(1002, 'remove')}>Remove Product 1002 to Card</button>
      <button onClick={() => cartContext.resetCart()}>Reset Cart</button>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
