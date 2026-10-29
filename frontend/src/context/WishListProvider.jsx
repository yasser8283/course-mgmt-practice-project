import { createContext, useContext } from "react";
import { useState, useEffect } from 'react'
import { useAuthContext } from "./AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const WishListContext = createContext();
const useWishList = () => {
    const WishListData = useContext(WishListContext)
    return WishListData
}

const WishListProvider = ({ children }) => {
    const [WishList, setWishList] = useState([])
    const { loginContext } = useAuthContext();

    useEffect(() => {
        const getWishList = async () => {
            try {
                if (loginContext?.userId) {
                    const res = await axios.get(`http://localhost:3000/wishlist?userId=${loginContext?.userId}`)
                    if (res.data.length > 0) {
                        const [{ courseIds }] = res.data;
                        setWishList(courseIds)
                    }
                    else {
                        setWishList([])
                    }
                }
                else {
                    setWishList([])
                    return;
                }
            }
            catch (err) {
                toast.error("Some error occured");
                console.error(err)
            }
        }
        getWishList();
    }, [loginContext?.userId])

    const toggleWishList = async (courseId) => {
        const updatedWishList = WishList.includes(courseId) ? (
            WishList.filter((idx) => idx !== courseId)
        ) :
            (
                [...WishList, courseId]
            )

        try {
            const resp = await axios.get(`http://localhost:3000/wishlist?userId=${loginContext?.userId}`)
            if (resp.data.length > 0) {
                let [{ id }] = resp.data
                try {
                    await axios.patch(`http://localhost:3000/wishlist/${id}`,
                        {
                            courseIds: updatedWishList
                        }
                    )
                    setWishList(updatedWishList)
                    toast.success("Added to Wishlist")
                }
                catch (err) {
                    console.error(err)
                }
            }
            else {
                const payload = {
                    userId: loginContext.userId,
                    courseIds: updatedWishList
                }
                try {
                    await axios.post('http://localhost:3000/wishlist', payload)
                    setWishList(updatedWishList)
                    toast.success("Added to Wishlist")
                }
                catch (err) {
                    console.error(err)
                }
            }
        }
        catch (err) {
            console.error(err)
        }
    }






    return (
        <WishListContext.Provider value={{ WishList, toggleWishList }}>
            {children}
        </WishListContext.Provider>
    )
}

export default WishListProvider
export { WishListContext, useWishList }