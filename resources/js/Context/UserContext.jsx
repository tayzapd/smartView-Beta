import { createContext,useContext,useState } from "react";

const UserContext = createContext({
    items:[],
    shop:[],
    setItems:() => {},
    setShop:() => {},
    dialog:false,
    setDialog:() => {},
});



export const UserProvider = ({children}) => {
    const [items,setItems] = useState([]);
    const [shop,setShop] = useState({});
    const [dialog,setDialog] = useState(false);
    const [theme,setTheme] = useState({
        navBarColor:'',
        navBarBackground:'',
        viewBackground:''
    })
    return (
        <UserContext.Provider value={{
            items,
            shop,
            setItems,
            setShop,
            dialog,
            setDialog
        }} >
            {children}
        </UserContext.Provider>
    )
}


export const useUserContext = () => useContext(UserContext);
