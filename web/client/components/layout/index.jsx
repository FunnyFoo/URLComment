import React from 'react'
import Header from '../header/index.jsx'

const Layout = ({ content = () => null }) => (
  <div>
    <Header />
    {content()}
  </div>
)

export default Layout
