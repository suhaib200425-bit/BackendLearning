import React from 'react'
import './Product.css'
import { useEffect } from 'react'
import { BASEURL } from '../../variable/variables'
import axios from 'axios'
import { useState } from 'react'
import { Upload } from '../../assets/assets'
import { useContext } from 'react'
import { Context } from '../../context/Context'
function Product() {
  const [Imageurls, setImageurls] = useState([])
  const [Product, setProduct] = useState({})
  const [AllProduct, setAllProduct] = useState([])
  const [PAGE, setPAGE] = useState(false)
  const [UPDATE, setUPDATE] = useState(false)
  const { User } = useContext(Context)
  useEffect(() => {
    const dataread = async () => {
      const res = await axios.get(`${BASEURL}/product`)
      res.data.status && setPAGE(true)
      res.data.status && setAllProduct(res.data.Items)
      console.log(res.data);
    }
    dataread()
  }, [])

  const HandleImage = (event) => {
    const file = event.target.files[0]
    setImageurls([...Imageurls, URL.createObjectURL(file)])
    setProduct({
      ...Product,
      images: Product.images ? [...Product.images, file] : [file]
    });
  }

  const Handlechange = (event) => {
    setProduct({ ...Product, [event.target.name]: event.target.value, user: User._id })
  }


  const HandleSubmit = async (event) => {
    event.preventDefault();
    if (Product.user) {

      const formData = new FormData();

      formData.append("name", Product.name);
      formData.append("category", Product.category);
      formData.append("price", Product.price);
      formData.append("description", Product.description);
      formData.append("user", Product.user);

      Product.images?.forEach(file => {
        formData.append("images", file);
      });
      let res
      if (!UPDATE) {
        res = await axios.post(`${BASEURL}/product/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        console.log(res.data);
        res.data.status && setAllProduct([...AllProduct, res.data.Items])
      } else {
        res = await axios.patch(`${BASEURL}/product/update/${Product.UPDATEID}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        res.data.status && setUPDATE(false)
        if (res.data.status) {
          const UpdateItem = res.data.items;
          const Data=AllProduct.map(element=>{
            if(element._id===UpdateItem._id)  return UpdateItem
            return element
          })
          setAllProduct(Data)
        }
        setPAGE(!PAGE)
      }

      if (res.data.status) {
        setProduct({})
        setImageurls([])
      }
    } else {
      alert('user is not Available')
    }
  }

  const Hoverfunction = ((element, imageid, active) => {
    console.log(element);
    document.getElementById(imageid).src = `${BASEURL}/image/${element}`
    document.getElementById(`${active}${imageid}`).style.backgroundColor = 'yellow'
  })

  const HoverDownfunction = (active, imageid) => {
    document.getElementById(`${active}${imageid}`).style.backgroundColor = 'black'
  }

  const deleteproduct = async (docid) => {

    const res = await axios.delete(`${BASEURL}/product/delete/${docid}`, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    if (res.data.status) {
      const filtered = AllProduct.filter(item => item._id !== docid);
      setAllProduct(filtered)
    }
    console.log(res.data);

  }
  const updateproduct = async (element) => {
    setUPDATE(true)
    const URLS = element.image.map(elem => `${BASEURL}/image/${elem}`)
    setImageurls(URLS)
    setProduct({
      name: element.name,
      category: element.category,
      price: element.price,
      description: element.description,
      user: User._id,
      UPDATEID: element._id
    })

    setPAGE(false)
    console.log(element);
  }

  function NumberToString(Price) {
        return Price.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
  return (
    <div className='Product'>
      <div className="TopBar col-12">
        <h4>Product</h4>
        <button className='Botton_New_item' onClick={() => {
          setPAGE(!PAGE)
          setUPDATE(false)
          setImageurls([])
          setProduct({})
        }}>Add Item</button>
      </div>
      {
        PAGE ?
          <div className="row productrow">
            {
              AllProduct && AllProduct.map((elem) => (
                <div className="col-4 d-flex justify-content-between flex-column mb-4">
                  <div className=" ProducBoxItem">
                    <div className='images col-12'>
                      <img id={elem._id} src={`${BASEURL}/image/${elem.image[0]}`} alt="" srcset="" />
                      <div className="imagenavigation">
                        {
                          elem.image.map((img, index) => <div id={`${index}${elem._id}`} onMouseOver={() => Hoverfunction(img, elem._id, index)} onMouseOut={() => HoverDownfunction(index, elem._id)} className=" ImageBox m-1"></div>)
                        }
                      </div>
                    </div>
                    <h5 className='mt-2'>{elem.name}</h5>
                    <h5 className='mt-2'>{elem.category}</h5>
                    <label>₹ {NumberToString(elem.price)}</label>
                    <p className='fw-description'>{elem.description}</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button className='Botton_New_item' onClick={() => updateproduct(elem)}>Update</button>
                    <button className='Botton_New_item' onClick={() => deleteproduct(elem._id)} >Remove</button>
                  </div>
                </div>
              ))
            }
          </div> :
          <>
            <div className="ImgaeUploaded col-12">
              <div className="" onClick={() => { document.getElementById('ImgaeInput').click() }}>
                <img src={Upload} alt="" srcSet="" />
                <input onChange={(e) => HandleImage(e)} type="file" className='d-none' name="images" id="ImgaeInput" accept="image/*" />
              </div>
              {
                Imageurls.map((elem, index) => (
                  <div className="" key={index}>
                    <img src={elem} alt="" srcSet="" />
                  </div>
                ))
              }
            </div>
            <form className="row" onSubmit={(e) => HandleSubmit(e)}>
              <div className="col-4 mt-2">
                <label htmlFor="">Name</label> <br />
                <input value={Product.name ? Product.name : ''} onChange={(e) => Handlechange(e)} className=' col-11 inputproduct_details' type="text" name='name' required placeholder='Product Name' />
              </div>
              <div className="col-4 mt-2">
                <label htmlFor="">Category</label> <br />
                <select value={Product.category ? Product.category : ''} onChange={(e) => Handlechange(e)} className="form-select select_value" id="inputGroupSelect01" name='category' >
                  <option selected>Chooce...</option>
                  <option value="IPhone">IPhone</option>
                  <option value="Mac Book">Mac Book</option>
                  <option value="IPab">IPab</option>
                  <option value="AirPods">AirPods</option>
                  <option value="Watch">Watch</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="col-4 mt-2">
                <label htmlFor="">Price</label> <br />
                <input value={Product.price ? Product.price : ''} onChange={(e) => Handlechange(e)} className=' col-11 inputproduct_details' type="number" name='price' required placeholder='Product Price' />
              </div>
              <div className="col-8 mt-2">
                <label htmlFor="">Description</label> <br />
                <textarea value={Product.description ? Product.description : ''} onChange={(e) => Handlechange(e)} required placeholder='Description' style={{ height: '150px', width: '100%' }} name="description" id="description" className='p-3'></textarea>
              </div>
              <div className="col-12 mt-2">
                <button type='submit' className="col-4 btn bg-primary " style={{ color: 'white' }}>{UPDATE ? 'Update' : 'Upload'} Product</button>
              </div>
            </form>
          </>
      }
    </div>
  )
}

export default Product