import React, { useContext } from 'react'
import { Link } from 'gatsby'
import CartContext from '../../../context/cartContext'
import './navigation.scss'

import logo from '../../../images/ridestore-logo.svg'

const NavigationBar = () => {
  const { cart } = useContext(CartContext)

  const TopBar = ({ message }) => {
    return (
      <div className="navbar-top">
        <div className="navbar-top-content container row">
          <div className="topbar-message" dangerouslySetInnerHTML={{ __html: message }} />
          <div className="menu-content">
            <ul>
              <li className="menu-content-item">My Orders</li>
              <li className="menu-content-item">Support</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="navigation-bar">
      <TopBar message={`<span class="text-bold">Free shipping. Free return.</span> All the time on all orders.`} />
      <div className="navbar-main container row">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="The Gatsbify Logo" />
        </Link>
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
          <div className="navbar-search-items">
            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="20px" viewBox="0 0 15 20">
              <g transform="translate(-336 -33)">
                <path
                  d="M339.51 33.95a7 7 0 0 1 9.59 2.59 7.12 7.12 0 0 1-1.87 9.21l3.65 6.38-1.46.85-3.65-6.38a6.97 6.97 0 0 1-8.83-2.97 7.16 7.16 0 0 1 2.57-9.68zm.84 1.47a5.41 5.41 0 0 0-1.95 7.36 5.34 5.34 0 0 0 7.29 1.97 5.41 5.41 0 0 0 1.95-7.36 5.34 5.34 0 0 0-7.29-1.97z"
                  fill="#393c43"
                />
              </g>
            </svg>
            <input className="navbar-search" type="text" placeholder="Search for products" />
          </div>

          {/* <div className="navbar-favourite">Heart</div> */}
          <div className="navbar-cart" onClick={() => cart.setDrawer(!cart.isDrawerOpen)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-178.000000, -15.000000)">
                  <g transform="translate(178.000000, -241.000000)">
                    <g transform="translate(0.000000, 256.000000)">
                      <g transform="translate(0.000000, 5.000000)" />
                      <rect stroke="#393C43" stroke-width="2" x="1" y="6" width="18" height="13" />
                      <path
                        d="M5.03403559,6 L14.9659644,6 C14.7190324,2.55483332 13.1230068,1 10,1 C6.87699319,1 5.2809676,2.55483332 5.03403559,6 Z"
                        stroke="#393C43"
                        stroke-width="2"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <div className="cart-badge"> {cart.getCartQuantity()}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NavigationBar
