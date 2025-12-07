import React, { useContext } from 'react'
import { useEffect } from 'react'
import './Flash.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASEURL } from '../../variable/variables.js'
import { Context } from '../../context/Context.jsx'
function Flash() {
    const navigate = useNavigate('')
    const { User, setUser } = useContext(Context)
    useEffect(() => {
        const Loading = async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${BASEURL}/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTimeout(() => {
                res.data.status ? navigate('/home') : navigate('/auth')
                res.data.status ? setUser(res.data.User) : setUser({})  
            }, 3000)
        }
        Loading()
    }, [])
    return (
        <div className='Flash container'>
            <img src='https://zebronics.com/cdn/shop/files/Zeb_HORIZONTAL_PNG_White.png?v=1686207745&width=290' alt="" srcset="" />
            <span class="loader"></span>
        </div>
    )
}

export default Flash