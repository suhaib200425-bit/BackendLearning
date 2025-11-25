import React, { useContext } from 'react'
import './Banner.css'
import { useEffect } from 'react'
import axios from 'axios'
import { BASEURL } from '../../variable/variables'
import { useState } from 'react'
import { Context } from '../../context/Context'
function Banner() {
    const {Banners}=useContext(Context)
    const [Index,setIndex]=useState(0)
    
    useEffect(()=>{
        setTimeout(()=>{
            if(Index<Banners.length-1){
                setIndex(Index+1)
            }else{
                setIndex(0)
            }
        },6000)
    })
    return (
        <div className='Banner'>
            {
                Banners.length!=0&&<img src={`${BASEURL}/image/${Banners[Index].image}`} alt="" srcSet="" />
            }
        </div>
    )
}

export default Banner