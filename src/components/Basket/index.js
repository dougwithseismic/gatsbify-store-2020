import React from 'react'
import './index.scss'

import productItem from '../../images/products/E7724_20.jpg'

const Basket = () => {
  return (
    <section className="basket">
      <h2>Shopping Bag</h2>
      <div className="basket-item-container">
        <div className="basket-item">
          <img src={productItem} className="item-image" />

          <div className="item-detail">
            <div className="item-brand">Dope</div>
            <div className="item-title">Dope Flamingo T-shirt</div>
            <div className="item-detail-lower">
              <div className="quantity-control">1</div>
              <div className="item-size">M</div>
            </div>
          </div>
          <div className="item-detail-right">
            <div className="item-price">£99</div>
            <div className="item-remove">BIN</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Basket
