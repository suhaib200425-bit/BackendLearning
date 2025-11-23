import React, { useEffect, useState, useContext } from 'react'
import { BASEURL } from '../../variable/variables'
import './Banner.css'
import axios from 'axios'
import { Context } from '../../context/Context'
function BannerDisplay({ setPAGE, PAGE, setImageUrl, setBanner, setUPDATE,type }) {
    const [AllBanner, setAllBanner] = useState([])
    const { User } = useContext(Context)
    useEffect(() => {
        const Banner = async () => {
            const res = await axios.get(`${BASEURL}/${type}/`)
            res.data.status && setAllBanner(res.data.Item)
            console.log(res.data.Item);
        }
        Banner()
    }, [])
    const deletebanner = async (bannerId) => {
        const res = await axios.delete(`${BASEURL}/${type}/delete/${bannerId}`);
        res.data.status && setAllBanner(AllBanner.filter(item => item._id !== bannerId))
        console.log(res.data);

    }
    const updatebanner = async (banner) => {
        setImageUrl(`${BASEURL}/image/${banner.image}`)
        setBanner({
            category: banner.category,
            user: User._id,
            BOCID: banner._id
        })
        setPAGE(false)
        setUPDATE(true)
    }
    return (
        <div className='BannerDisplay col-12 row'>
            <div className="TopBar col-12">
                <h4>Banners</h4>
                <button className='Botton_New_item' onClick={() => {
                    setPAGE(!PAGE)
                    setUPDATE(false)
                }}>Add Item</button>
            </div>
            {
                AllBanner && AllBanner.map(elem => (
                    <div className={type!='banner'?"col-3 Image_Box":"col-6 Image_Box"} key={elem._id}>
                        <img className='col-12' style={{width:type!='banner'&&'150px',height:type!='banner'&&'150px',borderRadius:type!='banner'&&'50%'}} src={`${BASEURL}/image/${elem.image}`} alt="" srcSet="" />
                        <div className={type!='banner'?"TopBar col-12 flex-column":"TopBar col-12"}>
                            <h5>{elem.category}</h5>
                            <div className="d-flex gap-2">
                                <button className='Botton_New_item' onClick={() => updatebanner(elem)}>Update</button>
                                <button className='Botton_New_item' onClick={() => deletebanner(elem._id)} >Remove</button>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default BannerDisplay