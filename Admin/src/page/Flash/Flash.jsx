import React from 'react'
import { useEffect } from 'react'
import './Flash.css'
import { Logo } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASEURL } from '../../variable/variables.js'
function Flash() {
    const navigate = useNavigate('')
    useEffect(() => {
        const Loading = async () => {
            const token =  localStorage.getItem("token");
            const res = await axios.get(`${BASEURL}/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTimeout(() => {
                res.data.status ? navigate('/home') : navigate('/auth')
                console.log(res.data);

            }, 3000)
        }
        Loading()
    }, [])
    return (
        <div className='Flash container'>
            <img src={Logo} alt="" srcset="" />
            <span class="loader"></span>
        </div>
    )
}

export default Flash