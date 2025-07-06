import React from 'react'
import Navbar from './Navbar'

const Layout = ({user, onLogout}) => {
  return (
    <div className='min-h-screen bg-gray-50'>
        <Navbar user={user} onLogout={onLogout} />
    </div>
  )
}

export default Layout