import React, { useContext } from 'react'
import './NavBar.css'
import { Logo } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context.jsx'
function NavBar({status}) {
    const { Categorys } = useContext(Context)
    const navigate = useNavigate()
    return (
        <div className='NavBar'>
            <div className="NavBar_Logo" onClick={() => navigate('/home')}>
                <img src={Logo} alt="" />
            </div>
            <div className="NavBar_Category">
                {
                    Categorys.length != 0 && Categorys.map(elem => (
                        <div onClick={(e) => {
                            e.preventDefault();
                            navigate(`/home/category/${elem.category}`);
                        }}>{elem.category}</div>
                    ))
                }
            </div>
            <div className="NavBar_icons ">
                <svg onClick={()=>status?navigate('/home'):navigate('/like')} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="mt-2 bi bi-box2-heart-fill" viewBox="0 0 16 16">
                    <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1zM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                </svg>
                <svg onClick={()=>status?navigate('/home'):navigate('/cart')} xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="mt-1 bi bi-backpack4" viewBox="0 0 16 16">
                    <path d="M4 9.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm1 .5v3h6v-3h-1v.5a.5.5 0 0 1-1 0V10z" />
                    <path d="M8 0a2 2 0 0 0-2 2H3.5a2 2 0 0 0-2 2v1c0 .52.198.993.523 1.349A.5.5 0 0 0 2 6.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.5a.5.5 0 0 0-.023-.151c.325-.356.523-.83.523-1.349V4a2 2 0 0 0-2-2H10a2 2 0 0 0-2-2m0 1a1 1 0 0 0-1 1h2a1 1 0 0 0-1-1M3 14V6.937q.24.062.5.063h4v.5a.5.5 0 0 0 1 0V7h4q.26 0 .5-.063V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1m9.5-11a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                </svg>
                <button className='p-2 LogOut' onClick={() => {
                    localStorage.setItem("token", false);
                    navigate('/auth')
                }} >LogOut</button>
            </div>
        </div>
    )
}

export default NavBar