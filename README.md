<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsbify Store
</h1>


A  CMS agnostic JAMstack commerce platform built on React & Gatsbify, designed (for Shopify) with marketing teams in mind.
Rapid sites, 100 100 100 Lightspeed sites with perfect SEO, Analytics and TPT integration - MINIMAL configuration required.

Features: 

Rich Category Pages
Detailed Product Pages
Landing Pages

Create-a-Cart API - Allows users to generate their own carts from outside the store for others to use, adding discounts and affiliate attribution along the way. Ahoy 🚀
Shared carts - Get the buy-in from friends and family with suggestions and shared cart shortlinks
Integrations with basically every ecomm tool imaginable, out-of-the-box - Yotpo, Shogun, Shopify Apps, Analytics, GTM, Ads, Feed Gen etc
Scheduled product launches and private product gateways.

Pay-by-social currency; Not all products cost cash. Some are worth a like, comment or subscription. Build those channels!

Content & Blogs via Contentful

Acquisition - 
Automated Google Ads Spinups. Have new Google Ads account, £75 free credit and a perfect campaign structure + reporting in one click.

Tracking & Analytics - 

Zero Setup Google Analytics - One click creation of new properties and views with preconfigured settings so there's zero setup or changes required. 
Full-coverage GTM Tracking; All site events emit detail-rich customEvent datalayer pushes.
Enhanced Ecommerce as standard.

Development - 

Headless Components by default: HOC components that pass down product information as props so you can keep logic going whilst rendering your own JSX.
// https://medium.com/merrickchristensen/headless-user-interface-components-565b0c0f2e18

Integrates with: 

* https://subscribers.com/

```javaScript
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
```






<!-- AUTO-GENERATED-CONTENT:END -->
