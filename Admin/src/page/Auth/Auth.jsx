import React from 'react'
import './Auth.css'
import { AuthScreen } from '../../assets/images.js'
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
                const res = await axios.post(`${BASEURL}/admin/login`, User)
                res.data.status && localStorage.setItem("token", res.data.token);
                res.data.status && navigate('/home')
                res.data && setUser({})
                console.log(res.data);
            } else {
                if (User.password === User.confirm_password) {
                    const res = await axios.post(`${BASEURL}/admin/register`, User)
                    console.log(res.data);
                    res.data.status && setForm(false)
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
                    <div className="othermethods mt-3">
                        <div className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                            </svg> <label htmlFor="" className='ms-1'>OOGLE</label>
                        </div>
                        <div className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                            </svg><label htmlFor="" className='ms-1'>aceBook</label>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Auth