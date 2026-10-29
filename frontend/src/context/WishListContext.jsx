import { createContext, useContext } from "react";
import { useState } from 'react'


const WishListContext = createContext();



const useWishList = () => {
    const WishListData = useContext(WishListContext)
    return WishListData
}

const WishListProvider = ({ children }) => {
    const [WishList, setWishList] = useState([])

  

    return (
        <WishListContext.Provider value={{ WishList, setWishList }}>
            {children}
        </WishListContext.Provider>
    )
}

export default WishListProvider
export { WishListContext, useWishList }