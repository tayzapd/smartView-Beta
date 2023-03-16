import { createContext,useContext,useState } from "react";

const UserContext = createContext({
    items:[],
    shop:[],
    setItems:() => {},
    setShop:() => {},
    dialog:false,
    setDialog:() => {},
    grid:false,
    setGrid:() => {},
    categories:[],
    setCategories:() => {} , 
});



export const UserProvider = ({children}) => {
    const [items,setItems] = useState([]);
    const [grid,setGrid] = useState(false);
    const [shop,setShop] = useState({});
    const [dialog,setDialog] = useState(false);
    const [categories,setCategories] = useState([]);
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
            setDialog,
            grid,
            setGrid,
            categories,
            setCategories
        }} >
            {children}
        </UserContext.Provider>
    )
}


export const useUserContext = () => useContext(UserContext);
