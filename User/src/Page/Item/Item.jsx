
import { BASEURL } from '../../variable/variables';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { useParams } from 'react-router-dom';
import './Item.css'
import axios from 'axios';
import NavBar from '../../Component/NavBar/NavBar';
import Product from '../../Component/Product/Product';
function Item() {
  const { product } = useParams();
  const [ITEM_RES, setITEM_RES] = useState({})
  const [rate, setrate] = useState('')
  const [mainimage, setmainimage] = useState('')
  const { NumberToString } = useContext(Context)
  useEffect(() => {
    window.scrollTo(0, 0);
    const getitem = async () => {
      const res = await axios.get(`${BASEURL}/product/${product}`)
      if (res.data.status) {
        setITEM_RES(res.data.Item)
        const numstring = NumberToString(res.data.Item.price)
        setrate(numstring)
        setmainimage(res.data.Item.image[0].image_path)
      } else {
        setITEM_RES([])
        setrate('')
      }
      console.log(res.data);
    }
    getitem()
  }, [product])
  return (
    <div className='container'>
      <NavBar />

      {
        ITEM_RES &&
        <div className='row mt-5'>
          <div className="col-6 left_product_box">
            <div className="left_image_box">
              {
                ITEM_RES.image && ITEM_RES.image.map(elem => <img onClick={() => setmainimage(elem.image_path)} key={elem.id} src={`${BASEURL}/image/${elem.image_path}`} alt="" srcSet="" />)
              }
            </div>
            <div className="rigth_image_box">
              <img src={`${BASEURL}/image/${mainimage}`} alt="" srcSet="" />
            </div>
          </div>
          <div className="col-6 details">
            <h1>{ITEM_RES.name}</h1>
            <h2 className='rate'>₹ {rate}</h2>
            <h5>{ITEM_RES.category}</h5>
            <p className='pb-3'>{ITEM_RES.description}</p>
            <div className="Buttons_Box_Item col-8">
              <div className="Addcart">
                <button><strong>Add To Cart</strong></button>
              </div>
              <div className="Addcart">
                <button style={{ backgroundColor: 'orange' }}><strong>Buy Now</strong></button>
              </div>
            </div>
          </div>
        </div>
      }
      <h3 className='mt-5'>{ITEM_RES.category}</h3>
      <Product text={ITEM_RES.category} id={ITEM_RES.id} />
    </div>
  )
}

export default Item