import React from 'react'
import ProductPage from '../templates/ProductPage'
import Layout from '../components/layout'
import SEO from '../components/seo'

export const productpage = () => {
  return (
    <Layout>
      <SEO />
      <ProductPage />
    </Layout>
  )
}
