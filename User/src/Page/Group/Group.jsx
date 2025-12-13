
import './Group.css'
import { useParams } from 'react-router-dom';
import NavBar from '../../Component/NavBar/NavBar'
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { BASEURL } from '../../variable/variables.js';
import Product from '../../Component/Product/Product';
import { useEffect,useState } from 'react';
function Group() {
  const { item } = useParams();
  const { Categorys } = useContext(Context)
  const [ITEM,setITEM]=useState({})
  useEffect(() => {
    console.log(Categorys);
    console.log(item);
    Categorys && Categorys.forEach(element => {
      if (element.category === item) {
        setITEM(element)
      }
    })
  }, [item])
  return (
    <div className='container'>
      <NavBar />
      <div className="row">
        <div className="col-2">
          {
            ITEM &&
            <div className="Group mt-3">
              <img src={`${BASEURL}/image/${ITEM.image}`} alt="" srcSet="" />
              <h3>{ITEM.category}</h3>
            </div>
          }
        </div>
        <div className="col-10">
          <Product text={item} size/>
        </div>
      </div>
      
    </div>
  )
}

export default Group