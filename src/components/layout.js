/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Navigation from './Common/Navigation'
import Drawer from './Common/Drawer'
import Basket from './Basket'
import CartContext from './../context/cartContext'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { cart } = useContext(CartContext)

  return (
    <Fragment>
      <Drawer openedClass="cart-drawer-open" closedClass="cart-drawer-closed">
      {/* Todo: Add logic to render different combos of components inside the drawer at will */}
        <Basket />
      </Drawer>

      <Navigation />
      <div>
        <main>{children}</main>
      </div>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
