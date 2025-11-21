import React, { useContext } from 'react'
import NavBar from '../../component/NavBar/NavBar'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { BASEURL } from '../../variable/variables'
import MainBox from '../../component/LeftBox/MainBox'
import { Context } from '../../context/Context'
import Empty from '../../component/Empty/Empty'


function Home() {
    const { User,setUser } = useContext(Context)
    useEffect(() => {
        const Loading = async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${BASEURL}/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(res.data.User) 
            console.log(res.data.User);
            
        }
        Loading()
    }, [])
    return (
        <div className='container'>
            {
                User ?
                    <>
                        <NavBar />
                        <MainBox />
                    </>:
                    <Empty />

            }
        </div>
    )
}

export default Home