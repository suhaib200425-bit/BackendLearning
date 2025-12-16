import React, { useContext, useEffect, useState } from 'react'
import './Buynow.css'
import NavBar from '../../Component/NavBar/NavBar'
import { Context } from '../../context/Context'
import { BASEURL } from '../../variable/variables'
import Empty from '../../Component/Empty/Empty'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import AddressForm from '../../Component/AddressForm/AddressForm'
function Buynow() {
    const { id } = useParams();
    const [qty, setqty] = useState(1)
    const [product, setproduct] = useState({})
    const [address, setaddress] = useState({})
    const [active, setactive] = useState(false)
    const [productrate, setproductrate] = useState(0)
    const [productrimage, setproductrimage] = useState('')
    const token = localStorage.getItem('token')
    const { NumberToString } = useContext(Context)
    useEffect(() => {
        const getnow = async () => {
            const res = await axios.get(`${BASEURL}/product/get/${id}`)
            const res1 = await axios.get(`${BASEURL}/address`, { headers: { Authorization: `Bearer ${token}` } })
            console.log(res1.data);

            res1.data.status && setaddress(res1.data.Item)
            res.data.status && setproduct(res.data.Item);
            res.data.status && setproductrate(res.data.Item.price);
            res.data.status && setproductrimage(res.data.Item.image[0].image_path);
        }
        getnow()
    }, [])
    return (
        <div className='container Buynow_container'>
            <NavBar />
            {
                product ?
                    <div className="Buynow row ">
                        <div className="col-8">
                            <h5 className='byunow_hed'>Product Details</h5>
                            <div className="buy_product row col-8 ms-1">
                                <div className="col-4 image">
                                    <img src={`${BASEURL}/image/${productrimage}`} alt="" />
                                </div>
                                <div className="col-8">
                                    <h3>{product.name}</h3>
                                    <label>{product.category}</label>
                                    <h5 style={{ color: 'rgba(34, 33, 32, 0.81)' }}>
                                        {product.price}
                                    </h5>
                                    <div className='col-3 Buy_Quantity mt-4' onClick={() => console.log()}>
                                        <div className="">
                                            <button className='' onClick={() => {
                                                if (qty > 1) {
                                                    setproductrate(prev => prev -= product.price)
                                                    setqty(prev => prev - 1)
                                                }
                                            }} >-</button>
                                        </div>
                                        <div className=""><h5>{qty}</h5></div>
                                        <div className="">
                                            <button className='' onClick={() => {
                                                setproductrate(prev => prev += product.price)
                                                setqty(prev => prev + 1)
                                            }}>+</button>
                                        </div>

                                    </div>
                                </div>


                            </div>
                            <div className="col-8 mt-3">
                                <h5 className='byunow_hed mt-3'>Delivery Address</h5>
                                {
                                    address.id &&
                                    <div className="current_address">
                                        <strong>{address.full_name}</strong>
                                        <hr />
                                        <p>
                                            {address.address} , {address.city}, 
                                            <br />
                                             {address.state}
                                             <br />
                                             PIN {address.pincode}
                                            <br />
                                            Near {address.mark}
                                            <br />
                                            </p>
                                    </div>
                                }
                                <p className='change_address' onClick={() => setactive(true)}>{address.id ? 'change' : 'Add Your Address'}</p>
                            </div>
                        </div>
                        <div className="col-4 back_buy">
                            <h4 className='byunow_hed'>Price Details </h4>

                            <div className="col-12 mt-3 mb-2 border"></div>
                            <div className="buyspe">
                                <h5>Total Product Price</h5>
                                <h5> {productrate && NumberToString(productrate)}</h5>
                            </div>
                            <div className="buyspe">
                                <h5>Delivery Charge</h5>
                                <h5> {NumberToString(40)}</h5>
                            </div>
                            <div className="col-12 border mb-4"></div>
                            <div className="buyspe">
                                <h5>Total Amount</h5>
                                <h5> {productrate && NumberToString(productrate + 40)}</h5>
                            </div>
                            <label htmlFor="" style={{ fontSize: '12px' }}>Clicking on 'Continue' will not deduct any money</label>
                            <div className="col-12 buybtn">
                                <button>Continue</button>
                            </div>
                            <div className="BUYIMAGE col-12">
                                <img src="https://i.pinimg.com/736x/4b/c5/a8/4bc5a864bc7cb0cffbee7b40e28f7c02.jpg" alt="" srcset="" />
                            </div>
                        </div>

                        {
                            active && <AddressForm setactive={setactive} setaddress={setaddress}/>
                        }
                    </div> :
                    < Empty />
            }
        </div>

    )
}

export default Buynow