import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import './Product.css'
import { BASEURL } from '../../variable/variables'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Product({ text, id, size }) {
    const navigate = useNavigate()
    const { Products, NumberToString} = useContext(Context)
    const token = localStorage.getItem('token')
    const AddToCart = async (Pid, Qty) => {
        console.log('Pid=' + Pid + '\n' + 'Qty=' + Qty);

        const res = await axios.post(
            `${BASEURL}/cart/add/${Pid}/${Qty}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        console.log(res.data);
    }

    return (
        <div className='row Product'>
            {Products && Products.map(elem => {
                if (text && text !== elem.category) {
                    console.log("sdsd" + text);
                    return <></>
                }
                if (id && id === elem.id) {
                    console.log("sdsd" + id);
                    return <></>
                }
                return <div className='col-3 p-4 pb-0' key={elem.id}  >
                    <div className="image_Item_box" onClick={() => { navigate(`/home/${elem.name}`) }}>
                        <img style={{ height: !size ? '250px' : '150px' }} src={`${BASEURL}/image/${elem.image[0].image_path}`} alt="" srcset="" />

                        {
                            !size &&
                            <div className="AddLike p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                </svg>
                            </div>
                        }
                    </div>
                    {
                        size && <h6 className='mt-2'>{elem.name}</h6>
                    }
                    {
                        !size &&
                        <div className="CartItem">
                            <div className="">
                                <h5 className='mt-2'>{elem.name}</h5>
                                <h5 className='mt-2'>₹ {NumberToString(elem.price)}</h5>
                                <p className='fw-lighter'>{elem.description}</p>
                            </div>
                            <div className="Buttons_Box">
                                <div className="Addcart" onClick={() => AddToCart(elem.id, 1)}>
                                    <button><strong>Add To Cart</strong></button>
                                </div>
                                <div className="Addcart">
                                    <button style={{ backgroundColor: 'orange' }}><strong>Buy</strong></button>
                                </div>
                            </div>
                        </div>
                    }
                </div>

            })}

        </div>
    )
}

export default Product