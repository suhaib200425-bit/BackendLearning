import React from 'react'
import Banner from '../Banner/Banner'
import Product from '../Product/Product'

function RightBox({ Page }) {
    return (
        <div className='RightBox col-12'>
            {Page === "Banner" && <Banner type='banner'/>}
            {Page === "Product" && <Product />}
            {Page === "Category" && <Banner type='category'/>}
        </div>
    )
}
export default RightBox