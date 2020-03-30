import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/layout'
import SEO from '../../components/seo'

import './categoryPage.scss'
import product1 from '../../images/product1.jpg'
import product2 from '../../images/product2.jpg'
import product3 from '../../images/product3.jpg'
import product4 from '../../images/product4.jpg'
import product5 from '../../images/product5.jpg'

import categoryPageImage from '../../images/categoryPage.jpg'

const CategoryPage = (props) => {
  return (
    <Layout>
      <SEO title="Category Page" />
      <section className="category-header">
        <div
          className="container category-header-content"
          style={{
            background: `linear-gradient(90deg, rgba(255,255,255,1) 49%, rgba(0,212,255,0) 100%), url(${categoryPageImage}) right`,
            height: '256px'
          }}
        >
          <div className="category-header-content">
            <h1>Dope</h1>
            <p>Dope Snow - A bad day riding is better than a good day at work!</p>
          </div>
        </div>
      </section>
      <div className="container">
        <section className="category-filter">filters</section>
        <section className="product-catalog">
          {/* Product Card */}
          <div className="product-card">
            <img src={product1} alt="" className="product-card-image" />
            <div className="product-card-detail">
              <div className="product-title">Dope Drizzard Outdoor Jacket Black</div>
              <div className="product-price">£99</div>
            </div>
          </div>
          {/* Product Card */}
          <div className="product-card">
            <img src={product2} alt="" className="product-card-image" />
            <div className="product-card-detail">
              <div className="product-title">Dope Drizzard Outdoor Jacket Black</div>
              <div className="product-price">£99</div>
            </div>
          </div>
          {/* Product Card */}
          <div className="product-card">
            <img src={product3} alt="" className="product-card-image" />
            <div className="product-card-detail">
              <div className="product-title">Dope Drizzard Outdoor Jacket Black</div>
              <div className="product-price">£99</div>
            </div>
          </div>
          {/* Product Card */}
          <div className="product-card">
            <img src={product4} alt="" className="product-card-image" />
            <div className="product-card-detail">
              <div className="product-title">Dope Drizzard Outdoor Jacket Black</div>
              <div className="product-price">£99</div>
            </div>
          </div>
          {/* Product Card */}
          <div className="product-card">
            <img src={product5} alt="" className="product-card-image" />
            <div className="product-card-detail">
              <div className="product-title">Dope Drizzard Outdoor Jacket Black</div>
              <div className="product-price">£99</div>
            </div>
          </div>
          {/* Product Card */}
          <div className="product-card">
            <img src={product1} alt="" className="product-card-image" />
            <div className="product-card-detail">
              <div className="product-title">Dope Drizzard Outdoor Jacket Black</div>
              <div className="product-price">£99</div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

CategoryPage.propTypes = {}

export default CategoryPage
