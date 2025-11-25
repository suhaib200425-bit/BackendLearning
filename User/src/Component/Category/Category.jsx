import React from 'react'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import './Category.css'
function Category() {
    const {Categorys}=useContext(Context)
  return (
    <div className='Category row'>
        {
            Categorys.length!=0&&Categorys.map(elem=>(
                <div className="col-4"> {elem.category}</div>
            ))
        }
    </div>
  )
}

export default Category