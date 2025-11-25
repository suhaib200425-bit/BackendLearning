import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASEURL } from "../variable/variables";

export const Context = createContext();

export default function ContextProvider({ children }) {
    const [User, setUser] = useState({});
    const [Banners, setBanners] = useState([])
    const [Categorys, setCategorys] = useState([])
    const [Products, setProducts] = useState([])
    useEffect(() => {
        const ReadAllApi = [
            axios.get(`${BASEURL}/banner`),
            axios.get(`${BASEURL}/category`),
            axios.get(`${BASEURL}/product`),
        ]

        // res.data.status ? setBanners(res.data.Item) : setBanners([])
        // res.data.status ?resolve(res.data):reject(res.data)


        Promise.all(ReadAllApi)
            .then((Apidata) => {
                const [Banner, Category, Product] = Apidata
                setBanners(Banner.data.Item)
                setCategorys(Category.data.Item)
                setProducts(Product.data.Items)
            })
            .catch(e => console.log(e.message))

    }, [])


    const value = {
        User,
        setUser,
        Banners,
        Categorys,
        Products
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}