import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import './Product.css'
import { BASEURL } from '../../variable/variables'
function Product() {
    const { Products, Categorys } = useContext(Context)

    function NumberToString(Price) {
        return Price.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    return (
        <div className='row Product'>
            {
                Categorys && Categorys.map(CategoryElement => (
                    <>
                        <h4 style={{ color: 'orange' }} className='fw-bold ps-4' id={CategoryElement.category}>{CategoryElement.category}</h4>
                        {Products && Products.map(elem => {
                            if (elem.category === CategoryElement.category) {
                                return <div className=" col-3 p-4">
                                    <div className="image_Item_box">
                                        <img src={`${BASEURL}/image/${elem.image[0]}`} alt="" srcset="" />
                                    </div>
                                    <div className="CartItem">
                                        <div className="">
                                            <h5 className='mt-2'>{elem.name}</h5>
                                            <h5 className='mt-2'>₹ {NumberToString(elem.price)}</h5>
                                            <p className='fw-lighter'>{elem.description}</p>
                                        </div>
                                        <div className="Buttons_Box">
                                            <div className="Addcart">
                                                <button>Add To Cart</button>
                                            </div>
                                            <div className="AddLike p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        })}
                    </>
                ))
            }
        </div>
    )
}

export default Product