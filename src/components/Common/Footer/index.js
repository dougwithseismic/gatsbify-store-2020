import React from 'react'
import PropTypes from 'prop-types'
import './footer.scss'
import { Link } from 'gatsby'

import appStore from '../../../images/app-store.png'
import playStore from '../../../images/play-store.png'

const footerDetail = [
  { name: 'Customer Service', items: [ 'Contact Us', 'FAQ', 'Returns' ] },
  { name: 'Info', items: [ 'Terms & Conditions', 'Privacy Policy' ] },
  { name: 'About', items: [ 'About Us', 'Reviews', 'Join Us' ] }
]

const Footer = (props) => {
  return (
    <section className="footer">
      <div className="top-footer">
        {footerDetail.map((item, i) => {
          return (
            <div className="footer-block">
              <span className="text-bold">{item.name}</span>
              {item.items.map((x, i) => {
                return (
                  <Link to="/" className="footer-link">
                    {x}
                  </Link>
                )
              })}
            </div>
          )
        })}
        <div className="footer-block">
          <span className="text-bold">Subscribe to newsletter</span>
          <p>Subscribe to our newsletter for news and updates. No spam, we promise! :)</p>
        </div>
      </div>

      <div className="low-footer">
        <div className="foot-icon" />
        <div className="foot-icon">
          <a className="app-store-logo" href="/">
            <img src={appStore} alt="Download The Ridestore App On iOS" />
          </a>
          <a className="app-store-logo" href="/">
            <img src={playStore} alt="Download The Ridestore App On Google Play" />
          </a>
        </div>
        <div className="foot-icon foot-social-icons">
          <span className="social-icon">Instagram</span>
          <span className="social-icon">Facebook</span>
          <span className="social-icon">TikTok</span>
        </div>
      </div>
      <span className="copyright">© 2020 Ridestore AB. All rights reserved</span>
    </section>
  )
}

Footer.propTypes = {}

export default Footer
