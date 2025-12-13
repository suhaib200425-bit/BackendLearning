import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import NavBar from '../../Component/NavBar/NavBar';
import './Cart.css'
import { BASEURL } from '../../variable/variables';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartImage } from '../../assets/assets.js';
function Cart() {
    const token = localStorage.getItem('token')
    const [CartItems, setCartItems] = useState([])
    const [GrandTotal, setGrandTotal] = useState(0)
    const [counter, setcounter] = useState([])
    const { NumberToString, } = useContext(Context)
    useEffect(() => {
        const getcartitem = async () => {
            const res = await axios.get(`${BASEURL}/cart`, { headers: { Authorization: `Bearer ${token}` } })
            if (res.data.status) {
                setCartItems(res.data.Item)
                const QTY = res.data.Item.map(elem => {
                    const total = elem.quantity * elem.product.price
                    setGrandTotal(prev => prev + total)
                    return { [elem.id]: elem.quantity }
                })
                setcounter(QTY)

            }
        }
        getcartitem()
        return () => {
            const res = axios.post(`${BASEURL}/cart/update`)
        }
    }, [])

    const addcounter = (KeyID) => {
        const NewQty = counter.map(elem => {
            const KEY = Object.keys(elem)
            if ([KEY] == KeyID) {
                return { [KEY]: elem[KeyID] + 1 }
            } else {
                return elem
            }
        })
        setcounter(NewQty)
    }
    const lesscounter = (KeyID) => {
        const NewQty = counter.map(elem => {
            const KEY = Object.keys(elem)
            if ([KEY] == KeyID && elem[KEY] > 1) {
                return { [KEY]: elem[KEY] - 1 }
            } else {
                return elem
            }
        })
        setcounter(NewQty)
    }
    const navigate = useNavigate()
    const Rowtotal = (Qty, Rate) => {
        const total = Qty * Rate
        return NumberToString(total)
    }

    const removecartitem = (Index, CartId, Rate) => {
        const total = counter[Index][CartId] * Rate
        setGrandTotal(prev => prev - total)
        const FilterCartItems = CartItems.filter(elem => { return elem.id !== CartId });
        const Filtercounter = counter.filter(elem => {
            const KEY = Object.keys(elem)
            console.log(KEY)
            return [KEY] != CartId
        });
        console.log(FilterCartItems);
        console.log(Filtercounter);

        setCartItems(FilterCartItems)
        setcounter(Filtercounter)
    }
    return (
        <div className='container'>
            <NavBar status />
            {
                counter.length && CartItems.length ? <div className="row">
                    <div className="col-7 shoping_cart pt-4">
                        <h2 className='fw-500'>Shoping Cart</h2>
                        <div className="display_cart_items row">
                            <div className="table_name col-12 border"></div>
                            <div className='table_name col-6'>Product</div>
                            <div className='table_name col-3'>Qty</div>
                            <div className='table_name col-3'>Total Price</div>
                            <div className="table_name col-12 border"></div>

                            <div className="col-12 cart_item">
                                {
                                    CartItems.map((element, index) => {
                                        console.log(element.product);

                                        return <div className='row' key={element.id}>
                                            <div className='col-6 Product' onClick={() =>
                                                navigate(`/home/${element.product.name}`)}>
                                                <img src={`${BASEURL}/image/${element.product.image[0].image_path}`} alt="" srcset="" />
                                                {element.product.name}
                                                <br />
                                                {element.product.category}
                                            </div>
                                            <div className='col-3 Quantity' onClick={() => console.log(counter)}>
                                                <div className="">
                                                    <button className='' onClick={() => {
                                                        if (counter[index][element.id]>1) {
                                                            setGrandTotal(prev => prev - element.product.price)
                                                            lesscounter(element.id)
                                                        }
                                                    }
                                                    } >-</button>
                                                </div>
                                                <div className="">{counter[index][element.id]}</div>
                                                <div className="">
                                                    <button className='' onClick={() => {
                                                        setGrandTotal(prev => prev + element.product.price)
                                                        addcounter(element.id)
                                                    }
                                                    }>+</button>
                                                </div>
                                            </div>
                                            <div className='col-3 Total' >
                                                <div className="">₹ {Rowtotal(counter[index][element.id], element.product.price)}</div>
                                                <div className="">
                                                    <svg onClick={() => removecartitem(index, element.id, element.product.price)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>

                            <div className="payment_amount mt-3">
                                <div className="div"><h5>TOTAL</h5></div>
                                <div className="div"><strong><h5>₹ {NumberToString(GrandTotal)}</h5></strong></div>
                            </div>
                            <div className="payment_amount">
                                <div className="div"><h5>DELIVERY</h5></div>
                                <div className="div"><strong><h5>₹ {NumberToString(40)}</h5></strong></div>
                            </div>
                            <div className="table_name col-12 border"></div>
                            <div className="payment_amount">
                                <div className="div"><strong><h5>GRAND TOTAL</h5></strong></div>
                                <div className="div"><strong><h5>₹ {NumberToString(GrandTotal + 40)}</h5></strong></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5 ps-5 payment_box">
                        <div className="Cartimage">
                            <img src={CartImage} alt="" srcset="" />
                        </div>
                    </div>
                </div> : <></>
            }
        </div>
    )
}

export default Cart