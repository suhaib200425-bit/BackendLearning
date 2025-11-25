import React from 'react'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import './Footer.css'
function Footer() {
    const {Categorys}=useContext(Context)
    return (
        <div className='Footer mt-4 row p-3'>

            {
                Categorys.length != 0 && Categorys.map(elem => (
                    <div className="col-12 mt-2"> {elem.category}</div>
                ))
            }
        </div>
    )
}

export default Footer