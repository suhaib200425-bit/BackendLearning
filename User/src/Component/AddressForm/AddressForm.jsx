import { useEffect, useState } from "react";
import './AddressForm.css'
import axios from "axios";
import { BASEURL } from "../../variable/variables";
const AddressForm = ({ setactive, setaddress }) => {
    const [AllAddress, setAllAddress] = useState([])
    const [addressactive, setaddressactive] = useState(false)
    const token = localStorage.getItem('token')
    useEffect(
        () => {
            const getalladdress = async () => {
                const res = await axios.get(`${BASEURL}/address/getall`, { headers: { Authorization: `Bearer ${token}` } })
                res.data.status && setAllAddress(res.data.Item)
                res.data.status && setaddressactive(true)
                console.log(res.data);

            }
            getalladdress()
        }, []
    )
    const [formData, setFormData] = useState({
        full_name: "",
        address: "",
        mark: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${BASEURL}/address/add`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data);
        if (res.data.status) {
            setaddress(res.data.Item)
            setactive(false)
            setFormData({
                full_name: "",
                address: "",
                mark: "",
                city: "",
                state: "",
                pincode: "",
                country: "India",
            })
        }

    };

    return (
        <div className="Address">
            {
                addressactive ?
                    <div className="address-form address-form-normal">
                        <button className="col-8" onClick={()=>setaddressactive(false)}>Create New Address</button>
                        <div className="address_scroll_bar">
                            {
                            AllAddress && AllAddress.map(elem => (
                                <div className="col-12 mt-3" key={elem.id} onClick={()=>{
                                    setaddress(elem)
                                    setactive(false)
                                }}>
                                    <div className="current_elem_address">
                                        <strong>{elem.full_name}</strong> <hr />
                                        <p>
                                            {elem.address} , {elem.city},{elem.state}
                                            <br />
                                            PIN {elem.pincode}
                                            Near {elem.mark}
                                            <br />
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    : <form onSubmit={handleSubmit} className={'address-form address-form-normal '}>
                        <h2>Add Address</h2>

                        <input
                            type="text"
                            name="full_name"
                            placeholder="Full Name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />


                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="mark"
                                    placeholder="Landmark (optional)"
                                    value={formData.mark}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            readOnly
                        />

                        <button type="submit">Save Address</button>
                    </form>

            }

        </div>
    );
};

export default AddressForm;
