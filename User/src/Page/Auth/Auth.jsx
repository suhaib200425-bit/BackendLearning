import React from 'react'
import './Auth.css'
import { AuthScreen } from '../../assets/assets.js'
import { useState } from 'react'
import axios from 'axios'
import { BASEURL } from '../../variable/variables.js'
import { useNavigate } from 'react-router-dom'
function Auth() {
    const navigate = useNavigate()
    const [Form, setForm] = useState(false)
    const [User, setUser] = useState({})

    const handlechange = (e) => {
        setUser({ ...User, [e.target.name]: e.target.value })
    }


    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            if (!Form) {
                const res = await axios.post(`${BASEURL}/user/login`, User)
                res.data.status && localStorage.setItem("token", res.data.token);
                res.data.status && navigate('/home')
                res.data && setUser({})
                console.log(res.data);
            } else {
                if (User.password === User.confirm_password) {
                    const res = await axios.post(`${BASEURL}/user/register`, User)
                    console.log(res.data);
                    res.data.status && setForm(true)
                    res.data.status && setUser({})
                } else alert('Password Is Not Matched')
            }
        } catch (err) {
            alert(err);

        }
    }
    return (
        <div className='Auth row'>
            <div className="col-6 p-5 image_auth_screen">
                <img src={AuthScreen} alt="" srcSet="" />
            </div>
            <div className="col-6 image_auth_screen">
                <div className="head head_border pb-2">
                    <h1>{Form ? 'Register Now' : 'Login'}</h1>
                    <p>Welcome {!Form && 'Back'} To ZEBRONICS.....</p>
                </div>
                <form onSubmit={handlesubmit} id='Formsubmition' className='head mt-4 pb-4'>
                    <div className="box pb-5 ">
                        {
                            Form && <>
                                <label>User Name</label>
                                <input value={User.name ? User.name : ''} onChange={(e) => handlechange(e)} className='col-8 ps-3' type="text" name='name' placeholder='User Name' required />
                            </>
                        }
                        <label className='mt-2'>Email</label>
                        <input value={User.email ? User.email : ''} onChange={(e) => handlechange(e)} className='col-8 ps-3' type="email" name='email' placeholder='Email' required />
                        <label className='mt-2'>Password</label>
                        <input value={User.password ? User.password : ''} onChange={(e) => handlechange(e)} className='col-8 ps-3' type="password" name='password' placeholder='Password' required />
                        {
                            Form && <>
                                <label className='mt-2'>Confirm Password</label>
                                <input value={User.confirm_password ? User.confirm_password : ''} onChange={(e) => handlechange(e)} className='col-8 ps-3 ' type="password" name='confirm_password' placeholder='Confirm Password' required /></>
                        }
                    </div>
                    <div className="head_border"></div>
                    <div className="Bottom_box row mt-4 ms-1 col-12 ">
                        <button type='submit' className="btn  col-4" onSubmit={(e) => handlesubmit(e)}><h5>{!Form ? 'Login' : 'Register'}</h5></button>
                        <div className="col-7">
                            <p>{Form ? 'Already Have Account?' : 'Create New Account!'} <span onClick={() => {
                                setForm(!Form)
                                setUser({})
                            }}>Click</span></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth