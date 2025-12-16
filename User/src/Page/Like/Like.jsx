import React, { useContext, useEffect, useState } from 'react'
import './Like.css'
import NavBar from '../../Component/NavBar/NavBar'
import axios from 'axios'
import { BASEURL } from '../../variable/variables'
import { Context } from '../../context/Context'
import { useNavigate } from 'react-router-dom'
import Empty from '../../Component/Empty/Empty'
function Like() {
    const token = localStorage.getItem('token')
    const [LikeItems, setLikeItems] = useState()
    const { NumberToString } = useContext(Context)
    const navigate = useNavigate()
    useEffect(() => {
        const getcartitem = async () => {
            const res = await axios.get(`${BASEURL}/like`, { headers: { Authorization: `Bearer ${token}` } })
            console.log(res.data);
            if (res.data.status) {
                setLikeItems(res.data.Item)
            }
        }
        getcartitem()
        return () => {
            const res = axios.post(`${BASEURL}/cart/update`)
        }
    }, [])


    const UnLiked = async (CartId) => {
        const res = await axios.delete(`${BASEURL}/like/delete/${CartId}`)
        if (res.data.status) {
            const FilterLikeItems = LikeItems.filter(elem => { return elem.id !== CartId });
            setLikeItems(FilterLikeItems)
        }
        console.log(res.data);
        
    }
    return (
        <div className='container'>
            <NavBar />
            {
                LikeItems ?
                    <div className="row display_like_items" >
                        <div className="table_name col-12 border mt-2"></div>

                        <div className="col-12 like_item">
                            {
                                LikeItems.map((element) => {
                                    console.log(element.product);

                                    return <div className='row' key={element.id} >
                                        <div className='col-6 Product' onClick={() =>
                                            navigate(`/home/${element.product.name}`)} style={{ cursor: 'pointer' }}>
                                            <img src={`${BASEURL}/image/${element.product.image[0].image_path}`} alt="" srcset="" />
                                            <div className="PRODUCT_TEXT">
                                                <h3>{element.product.name}</h3>
                                                <p>{element.product.description}</p>
                                            </div>
                                        </div>
                                        <div className='col-3 Quantity'>
                                            <h5>{element.product.category}</h5>
                                        </div>
                                        <div className='col-3 Total' >
                                            <div className=""><h5>{NumberToString(element.product.price)}</h5></div>
                                            {
                                                <div className="UlLike p-2" onClick={(event) => {
                                                    event.stopPropagation()
                                                    UnLiked(element.id)
                                                }
                                                }>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                                    </svg>
                                                    <p className='ms-2'>UnLike</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    : <Empty />
            }
        </div>

    )
}

export default Like