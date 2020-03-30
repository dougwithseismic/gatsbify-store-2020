import React, { useContext, Fragment } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import CartContext from '../context/cartContext'
import ProductCard from '../components/ProductCard'
import { ProductCardContext } from '../components/ProductCard'

import image1 from '../images/1.jpg'
import image2 from '../images/2.jpg'
import image3 from '../images/3.jpg'
import image4 from '../images/4.jpg'
import image5 from '../images/5.jpg'

import adidas from '../images/adidas0.png'
import burton from '../images/burton0.png'
import dope from '../images/dope0.png'
import douchebags from '../images/douchebags0.png'
import montec from '../images/montec0.png'
import oakley from '../images/oakley0.png'
import picture from '../images/picture0.png'
import northface from '../images/the-north-face0.png'
import vans from '../images/vans0.png'

import adidasCard from '../images/adidas-card.jpg'
import dopeCard from '../images/dope-card.jpg'

import Drawer from '../components/Common/Drawer'

import './index.scss'
import Footer from '../components/Common/Footer'

const categories = [
  { name: 'Outdoor - Men', img: image1 },
  { name: 'Outdoor - Women', img: image2 },
  { name: 'Snow - Men', img: image3 },
  { name: 'Snow - Women', img: image4 },
  { name: 'Extra Content', img: image5 }
]

const brands = [
  { name: 'adidas', img: adidas, showcase: adidasCard },
  { name: 'burton', img: burton },
  { name: 'dope', img: dope, showcase: dopeCard },
  { name: 'douchebags', img: douchebags },
  { name: 'montec', img: montec },
  { name: 'oakley', img: oakley },
  { name: 'picture', img: picture },
  { name: 'northface', img: northface },
  { name: 'vans', img: vans }
]

const footerDetail = [
  { name: 'Customer Service', items: [ 'Contact Us', 'FAQ', 'Returns' ] },
  { name: 'Info', items: [ 'Terms & Conditions', 'Privacy Policy' ] },
  { name: 'About', items: [ 'About Us', 'Reviews', 'Join Us' ] }
]

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="container">
        <section className="hero-content">
          <div className="hero-left">
            <h1>Blazingly Fast Ecommerce Built For Performance Marketing Teams.</h1>
            <p>
              Powered by <span className="text-bold">Shopify and Gatsby</span>, and built by award-winning Performance
              Marketers to one-up the current state of ecommerce stagnancy with innovative,{' '}
              <span className="text-bold">revenue-driving features</span> like Affiliate Create-a-Carts, shared baskets,
              pay-by-social and automated acquisition in <span className="text-bold">fifteen languages</span>.
            </p>
            <p>
              Something something beautiful sites to <span className="text-bold">make your competitors envious</span> and your
              customers rave about your brand.
            </p>
          </div>
          <div className="hero-right">
            {/* <div className="cta-btn">View Collection</div> */}
          </div>
        </section>
        <section className="categories">
        <h3 className="showcase-heading">Categories</h3>

        <div className="category-content">
        {categories.map((cat, i) => {
            return (
              <Link className="category-block" to='/categoryPage' key={i}>
                <img className="category-image" src={cat.img} alt={`The Ridestore ${cat.name} Category`} />
                <div className="category-name">{cat.name}</div>
              </Link>
            )
          })}
        </div>

        </section>
        <section className="brands">
          <div className="brand-logos">
            {brands.map((brand, i) => {
              return (
                <Link className="brand-logo" to="/">
                  <img src={brand.img} alt={`The ${brand.name} Logo`} />
                </Link>
              )
            })}
            <span className="brand-logo">see all brands</span>
          </div>
        </section>
        <section className="showcase">
          <h3 className="showcase-heading">#STREETWEAR</h3>
          <div className="showcase-cards">
            <div className="showcase-card">
              <div className="showcase-card-head">
                <img src={brands[0].img} alt="Meaningful text" /> <span>{brands[0].name}</span>
              </div>
              <img className="showcase-card-image" src={brands[0].showcase} />
              <div className="showcase-card-foot">
                <h3>The North Face</h3>
                <span>Defy the past. Wear the future. - FutureLight</span>
              </div>
            </div>
            <div className="showcase-card">
              <div className="showcase-card-head">
                <img src={brands[2].img} alt="Meaningful text" /> <span>{brands[2].name}</span>
              </div>
              <img className="showcase-card-image" src={brands[2].showcase} />
              <div className="showcase-card-foot">
                <h3>The North Face</h3>
                <span>Defy the past. Wear the future. - FutureLight</span>
              </div>
            </div>
            <div className="showcase-card">
              <div className="showcase-card-head">
                <img src={brands[0].img} alt="Meaningful text" /> <span>{brands[0].name}</span>
              </div>
              <img className="showcase-card-image" src={brands[0].showcase} />
              <div className="showcase-card-foot">
                <h3>The North Face</h3>
                <span>Defy the past. Wear the future. - FutureLight</span>
              </div>
            </div>
            <div className="showcase-card">
              <div className="showcase-card-head">
                <img src={brands[0].img} alt="Meaningful text" /> <span>{brands[0].name}</span>
              </div>
              <img className="showcase-card-image" src={brands[0].showcase} />
              <div className="showcase-card-foot">
                <h3>The North Face</h3>
                <span>Defy the past. Wear the future. - FutureLight</span>
              </div>
            </div>
          </div>
        </section>
        {/* SECTION TWO */}
        <section className="showcase">
          <h3 className="showcase-heading">#SNOW</h3>
          <div className="showcase-cards">
            <div className="showcase-card">
              <div className="showcase-card-head">
                <img src={brands[0].img} alt="Meaningful text" /> <span>{brands[0].name}</span>
              </div>
              <img className="showcase-card-image" src={brands[0].showcase} />
              <div className="showcase-card-foot">
                <h3>The North Face</h3>
                <span>Defy the past. Wear the future. - FutureLight</span>
              </div>
            </div>{' '}
            <div className="showcase-card">
              <div className="showcase-card-head">
                <img src={brands[2].img} alt="Meaningful text" /> <span>{brands[2].name}</span>
              </div>
              <img className="showcase-card-image" src={brands[2].showcase} />
              <div className="showcase-card-foot">
                <h3>The North Face</h3>
                <span>Defy the past. Wear the future. - FutureLight</span>
              </div>
            </div>
            <div className="showcase-card">
              <div className="showcase-card-head">
                <img src={brands[0].img} alt="Meaningful text" /> <span>{brands[0].name}</span>
              </div>
              <img className="showcase-card-image" src={brands[0].showcase} />
              <div className="showcase-card-foot">
                <h3>The North Face</h3>
                <span>Defy the past. Wear the future. - FutureLight</span>
              </div>
            </div>
            <div className="showcase-card">
              <div className="showcase-card-head">
                <img src={brands[0].img} alt="Meaningful text" /> <span>{brands[0].name}</span>
              </div>
              <img className="showcase-card-image" src={brands[0].showcase} />
              <div className="showcase-card-foot">
                <h3>The North Face</h3>
                <span>Defy the past. Wear the future. - FutureLight</span>
              </div>
            </div>
          </div>
        </section>
        {/* SECTION THREE */}
        <section className="showcase">
          <h3 className="showcase-heading">#GIRLS</h3>
          <div className="showcase-cards">
            <div className="showcase-card">
              <div className="showcase-card-head">
                <img src={brands[0].img} alt="Meaningful text" /> <span>{brands[0].name}</span>
              </div>
              <img className="showcase-card-image" src={brands[0].showcase} />
              <div className="showcase-card-foot">
                <h3>The North Face</h3>
                <span>Defy the past. Wear the future. - FutureLight</span>
              </div>
            </div>
            <div className="showcase-card">
              <div className="showcase-card-head">
                <img src={brands[2].img} alt="Meaningful text" /> <span>{brands[2].name}</span>
              </div>
              <img className="showcase-card-image" src={brands[2].showcase} />
              <div className="showcase-card-foot">
                <h3>The North Face</h3>
                <span>Defy the past. Wear the future. - FutureLight</span>
              </div>
            </div>
            <div className="showcase-card">
              <div className="showcase-card-head">
                <img src={brands[0].img} alt="Meaningful text" /> <span>{brands[0].name}</span>
              </div>
              <img className="showcase-card-image" src={brands[0].showcase} />
              <div className="showcase-card-foot">
                <h3>The North Face</h3>
                <span>Defy the past. Wear the future. - FutureLight</span>
              </div>
            </div>
            <div className="showcase-card">
              <div className="showcase-card-head">
                <img src={brands[0].img} alt="Meaningful text" /> <span>{brands[0].name}</span>
              </div>
              <img className="showcase-card-image" src={brands[0].showcase} />
              <div className="showcase-card-foot">
                <h3>The North Face</h3>
                <span>Defy the past. Wear the future. - FutureLight</span>
              </div>
            </div>
          </div>
        </section>

        {/* Commerce Info */}
        <section className="commerce-info">
          <div>
            <h4>Fast Deliveries</h4>
            <span>Between 4 - 6 days delivery time</span>
          </div>
          <div>
            <h4>Free Shipping</h4>
            <span>Free shipping and free returns, always.</span>
          </div>
          <div>
            <h4>90 Days Right Of Return</h4>
            <span>Return shipping is prepaid, too.</span>
          </div>
        </section>
        <section className="additional-info">
          <p>
            <span className="text-bold">Ridestore.com</span> - Top brands and the highest quality clothing for
            snowboard, ski, outdoor & streetwear. Get free shipping and free returns, 30-day money back guarantee and
            fast delivery.
          </p>
        </section>
        <section className="reviews">
          <div className="reviews-star-rating">*****</div>
          <h3 className="review-text">Great price great item fast shipping very happy</h3>
          <div className="review-info">
            <span className="text-bold">Jake K.</span>
            <span>3 days ago</span>
          </div>
          <div className="cta-btn">All Reviews</div>
        </section>
        <Footer />
      </div>
    </Layout>
  )
}

export default IndexPage
