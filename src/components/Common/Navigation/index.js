import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CartContext from '../../../context/cartContext'

const NavigationBar = (props) => {
  const { getCartTotalQuantity } = useContext(CartContext)
  return (
    <header>
      <div className="top-bar">
        <div className="topbar-subby">Ridestore</div>
        <div className="menu-content">
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </div>
      <div className="navbar-main">
        <div className="navbar-logo">Ridestore</div>
        <div className="navbar-categories">
          <ul>
            <li>Snowboard</li>
            <li>Ski</li>
            <li>Outdoor</li>
            <li>Streetwear</li>
            <li>Brands</li>
          </ul>
        </div>
        <div className="navbar-right">
          <div className="navbar-search">Search for products</div>
          <div className="navbar-favourite">Heart</div>
          <div className="navbar-cart">{getCartTotalQuantity()}</div>
        </div>
      </div>
    </header>
  )
}

NavigationBar.propTypes = {}

export default NavigationBar
