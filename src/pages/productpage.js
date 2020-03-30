import React from 'react'
import ProductPage from '../templates/ProductPage'
import Layout from '../components/layout'
import SEO from '../components/seo'

// Careful of the Product vs Products spelling! 
const ProductsPage = () => {
  return (
    <Layout>
      <SEO />
      <ProductPage />
    </Layout>
  )
}

export default ProductsPage

