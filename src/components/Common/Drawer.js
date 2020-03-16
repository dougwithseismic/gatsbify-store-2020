import React from 'react'

/**
 * <Drawer>{children}</Drawer>
 * Renders a drawer that can be opened and closed 
 * @param {bool} isOpen - Whether the drawer is open or not.
 * @param {string} openedClass - The class given to an opened Drawer.
 * @param {string} closedClass - The class given to a closed Drawer.
 * 
 */

const Drawer = ({ isOpen, openedClass, closedClass, children }) => {
  return (
    <div className={isOpen ? openedClass : closedClass} >
      <h1>Hello</h1>
      {children}
    </div>
  )
}

export default Drawer
