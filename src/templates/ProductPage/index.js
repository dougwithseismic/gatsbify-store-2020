import React from 'react'
import PropTypes from 'prop-types'

import product1 from '../../images/products/E7724_20.jpg'
import product2 from '../../images/products/E7724_21.jpg'
import product3 from '../../images/products/E7724_22.jpg'
import product4 from '../../images/products/E7724_23.jpg'
import product5 from '../../images/products/E7724_24.jpg'
import product6 from '../../images/products/E7724_25.jpg'

import './productpage.scss'

const ProductPage = (props) => {
  return (
    <section className="product-content">
      <div className="container">
        {/* breadcrumbs */}
        <div className="breadcrumbs">
          <span>Outdoor</span>
          <span>/</span>
          <span>Outdoor Jackets</span>
          <span>/</span>
          <span>Dope</span>
          <span>/</span>
          <span className="text-bold">Dope Drizzard Outdoor Jacket Black</span>
        </div>
      </div>

      {/* Product Carousel */}
      <section className="product-carousel">
        <div className="product-images">
          <div className="product-img">
            <img src={product1} alt="" />
          </div>
          <div className="product-img">
            <img src={product2} alt="" />
          </div>
          <div className="product-img">
            <img src={product3} alt="" />
          </div>
          <div className="product-img">
            <img src={product4} alt="" />
          </div>
          <div className="product-img">
            <img src={product5} alt="" />
          </div>
          <div className="product-img">
            <img src={product6} alt="" />
          </div>
        </div>

        {/* Sits on top of product-images */}
        <div className="product-control">
          <div className="control-left"> LEFT </div>
          <div className="control-right"> RIGHT </div>
        </div>

        {/* Product Box - Sits on top of carousel */}
        <div className="product-action-box">
          <div className="product-action-top">
            <h3 className="product-action-title">Drizzard</h3>
            <span className="product-action-brand">Dope</span>
          </div>
          <div className="product-action-variants">
            <div className="variant-name">Black</div>
            <div className="variant-swatches">
              <div className="colour-swatch" />
              <div className="colour-swatch" />
            </div>
          </div>
          <div className="product-action-sizes">
            <div className="action-size-selector">
              <div className="size-swatch">XS</div>
              <div className="size-swatch">S</div>
              <div className="size-swatch">M</div>
              <div className="size-swatch">L</div>
              <div className="size-swatch">XL</div>
              <div className="size-swatch">XXL</div>
            </div>
            <span>Find Your Size</span>
          </div>
          <div className="action-cta">
            <div className="buy-btn">£99</div>
            <div className="fav-button">L</div>
          </div>
          <div className="action-benefits">
            <div className="action-benefit">Free shopping and free returns</div>
            <div className="action-benefit">90 day right of return</div>
            <div className="action-benefit">4-6 delivery time</div>
          </div>
        </div>
      </section>

      <section className="product-detail">
        <div className="product-detail-main">
          <div className="primary-detail">
            <h1 className="product-detail-header">Drizzard</h1>
            <span className="product-detail-desc">Outdoor Jacket / Dope</span>
            <p>
              Lightweight just got lighter! Meet the Drizzard jacket from Dope, a 2.5 membrane super-lightweight rain
              jacket, in a true Dope style.
            </p>
            <p>
              Actually, it’s so light that it feels like wearing nothing at all — more like a super stylish weather
              protective forcefield than anything else.
            </p>
            <p>
              We made the the Drizzard jacket with a stretchy fabric, so it’s sure to provide a super comfortable fit
              and move with you no matter what you’re doing.
            </p>
            <p>
              We know you need to keep your hands free, so we added in two large front pockets — one on the chest and
              one on the stomach, both of which are equipped with waterproof zippers.
            </p>
            <p>
              The jacket has an impressive 30K breathability rating, waterproof ventilation zippers, fully seams taped,
              and a visored hood, keeping you well protected against the elements.
            </p>
            <p>Why choose between function and looks when you can have both?</p>
          </div>
          <div className="secondary-detail">
            <div>Windproof</div>
            <div>no fluorocarbons</div>
            <div>Waterproofing</div>
          </div>
        </div>
        <div className="product-highlights" />
      </section>
    </section>
  )
}

ProductPage.propTypes = {}

export default ProductPage
