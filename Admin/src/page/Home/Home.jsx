import React from 'react'
import NavBar from '../../component/NavBar/NavBar'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { BASEURL } from '../../variable/variables'


function Home() {
    const [user, setuser] = useState({})
    useEffect(() => {
        const Loading = async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${BASEURL}/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTimeout(() => {
                console.log(res.data);
                setuser(res.data)
            }, 3000)
        }
        Loading()
    }, [])
    return (
        <div className='container'>
            <NavBar />
            {
                user && <h1>{user.message}</h1>
            }
        </div>
    )
}

export default Home