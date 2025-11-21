import React, { useState } from 'react'
import './MainBox.css'
import RightBox from '../RightBox/RightBox'
function MainBox() {
    const [Page, setPage] = useState('Banner')
    return (
        <div className='MainBox row'>
            <div className=" MenuButtos col-3 p-3">
                <button className={Page == 'Banner' ? 'MenuButton Active col-10' : 'MenuButton col-10'} onClick={() => setPage('Banner')}>Banner</button>
                <button className={Page == 'Product' ? 'MenuButton Active col-10' : 'MenuButton col-10'} onClick={() => setPage('Product')}>Product</button>
                <button className={Page == 'Category' ? 'MenuButton Active col-10' : 'MenuButton col-10'} onClick={() => setPage('Category')}>Category</button>
            </div>
            <div className="col-9 p-3">
                <RightBox Page={Page} />
            </div>
        </div>
    )
}

export default MainBox