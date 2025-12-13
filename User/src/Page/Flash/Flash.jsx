
import { useEffect } from 'react'
import './Flash.css'
import { Logo } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASEURL } from '../../variable/variables.js'
import { useContext } from 'react'
import { Context } from '../../context/Context.jsx'
function Flash() {
    const navigate = useNavigate('')
    useEffect(() => {
        const Loading = async () => {
            const token = localStorage.getItem("token")
            console.log(token);
            
            const res = await axios.get(`${BASEURL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTimeout(() => {
                console.log(res.data);
                res.data.status ? navigate('/home') : navigate('/auth')
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