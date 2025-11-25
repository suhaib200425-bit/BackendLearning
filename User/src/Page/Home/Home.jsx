import React from 'react'
import NavBar from '../../Component/NavBar/NavBar'
import Banner from '../../Component/Banner/Banner'
import Product from '../../Component/Product/Product'
function Home() {
  return (
    <div className='container'>
        <NavBar />
        <Banner />
        <Product />
    </div>
  )
}

export default Home