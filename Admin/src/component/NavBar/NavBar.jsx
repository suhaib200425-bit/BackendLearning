import React, { useContext } from 'react'
import './NavBar.css'
import { Logo } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context.jsx'
function NavBar() {
    const {setUser}=useContext(Context)
    const navigate=useNavigate()
    return (
        <div className='NavBar'>
            <div className="NavBar_Logo">
                <img src={Logo} alt="" />
            </div>
            <div className="NavBar_icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
                <button className='p-2 LogOut'onClick={()=>{
                    setUser({})
                    localStorage.setItem("token", false);
                    navigate('/auth')
                }} >LogOut</button>
            </div>
        </div>
    )
}

export default NavBar