import { createContext,useContext,useState } from "react";

const UserContext = createContext({
    items:[],
    shop:[],
    setItems:() => {},
    setShop:() => {}
});


export const UserProvider = ({children}) => {
    const [items,setItems] = useState([]);
    const [shop,setShop] = useState({});
    
    return (
        <UserContext.Provider value={{
            items,
            shop,
            setItems,
            setShop
        }} >
            {children}
        </UserContext.Provider>
    )
}


export const useUserContext = () => useContext(UserContext);
