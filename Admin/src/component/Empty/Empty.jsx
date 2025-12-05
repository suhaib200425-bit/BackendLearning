import React from 'react'
import { Logo } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'

function Empty({PAGE}) {
    const navigate=useNavigate()
    return (
        <div class="d-flex flex-column justify-content-center align-items-center" style={{height:PAGE?'80vh':'90vh'}}>
            {!PAGE&&<img src={Logo} alt="" srcset="" className='mb-5'/>}
            <div class="p-3 text-white"><h3>{PAGE?'Data Is':'Page Is'} Not Available</h3></div>
            <p style={{color:'rgba(240, 228, 228, 0.69)'}}>You Have Accessed This Page In An Incorrect Way. </p>
            {!PAGE&&<button onClick={()=>navigate('/')} type='button' className='btn btn-warning  col-4'><h4>Exit</h4></button>}
        </div>
    )
}

export default Empty