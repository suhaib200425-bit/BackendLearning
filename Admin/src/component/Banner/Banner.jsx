import React, { useContext, useEffect, useState } from 'react'
import './Banner.css'
import axios from 'axios'
import { BASEURL } from '../../variable/variables'
import { Context } from '../../context/Context'
import { Upload } from '../../assets/assets'
import BannerDisplay from './BannerDisplay'
function Banner({type}) {
    const [ImageUrl, setImageUrl] = useState('')
    const [PAGE, setPAGE] = useState(false)
    const [UPDATE, setUPDATE] = useState(false)
    const [Banner, setBanner] = useState({
        category: 'Choose...'
    })
    const { User } = useContext(Context)
    useEffect(() => {
        const Banner = async () => {
            const res = await axios.get(`${BASEURL}/${type}/`)
            res.data.status && setPAGE(true)
        }
        Banner()
    }, [])
    const ImageAdd = () => {
        document.getElementById('ImgaeInput').click()
        const user = User?._id;
        setBanner({ ...Banner, user })
    }
    const HandleImage = (e) => {
        const file = e.target.files[0]
        setImageUrl(URL.createObjectURL(file))
        setBanner({ ...Banner, image: file })
    }
    const HandleSubmit = async (e) => {
        if (Banner.category && Banner.user) {
            let res
            if (!UPDATE && Banner.image) {
                res = await axios.post(`${BASEURL}/${type}/upload`, Banner, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log(res);
            }
            else if (UPDATE) {
                alert('hghg')
                res = await axios.patch(`${BASEURL}/${type}/update/${Banner.BOCID}`, Banner, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                console.log(res.data);
                setUPDATE(false)
            }
            else {
                alert('Image Not Founded')
            }
            res.data.status && setBanner({ category: 'Choose...' })
            res.data.status && setImageUrl('')

        } else {
            alert('Enter All Data')
        }
    }
    return (
        <div className='Banner'>
            {
                !PAGE ?
                    <>
                        <div className="TopBar col-12">
                            <h4>Banners</h4>
                            <button className='Botton_New_item' onClick={() => {
                                setUPDATE(false)
                                setPAGE(!PAGE)
                            }}>Add Item</button>
                        </div>
                        <div style={{width:type!='banner'?'200px':'300px'}} className="imageBox pt-3"  onClick={ImageAdd}>
                            <img style={{borderRadius:type!='banner'?'50%':'10px'}} src={ImageUrl != '' ? ImageUrl : Upload} alt="" />
                            <input onChange={(e) => HandleImage(e)} type="file" className='d-none' name="image" id="ImgaeInput" accept="image/*" />
                        </div>
                        <h5 className='mt-3'>Category</h5>
                        <div className="col-6">
                            <select value={Banner.category} className="form-select select_value" id="inputGroupSelect01" name='category' onChange={(e) => setBanner({ ...Banner, [e.target.name]: e.target.value })}>
                                <option selected>{Banner.category}</option>
                                <option value="IPhone">IPhone</option>
                                <option value="Mac Book">Mac Book</option>
                                <option value="IPab">IPab</option>
                                <option value="AirPods">AirPods</option>
                                <option value="Watch">Watch</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                        <button className="btn col-3 mt-3 btn-primary" onClick={(e) => HandleSubmit(e)}><h5>Upload</h5></button>
                    </> :
                    <BannerDisplay type={type} setPAGE={setPAGE} setBanner={setBanner} setImageUrl={setImageUrl} PAGE={PAGE} setUPDATE={setUPDATE} />
            }
        </div>
    )
}

export default Banner