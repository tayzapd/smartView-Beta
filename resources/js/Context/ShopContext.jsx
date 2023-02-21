import { createContext,useContext,useState } from "react";
import axios from "axios";

const ShopContext = createContext({
    user:null,
    token:null,
    axios:null,
    setUser: () => {},
    setToken: () => {},
    users:[],
    setUsers:() =>{}
});


export const ShopProvider = ({children}) => {
    const [user,_setUser] = useState({});
    const [users,setUsers] = useState([]);
    const [token,_setToken] = useState(localStorage.getItem('shop_token'));

    const setToken = (token) => {
        _setToken(token);
        if(token){
            localStorage.setItem('shop_token',token);
        }else {
            localStorage.removeItem('shop_token');
        }
    }

    const setUser = (user) => {
        _setUser(user);
    }
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    

    return (
        <ShopContext.Provider value={{
            user,
            token,
            users,
            setUser,
            setUsers,
            setToken,
            axios
        }} >
            {children}
        </ShopContext.Provider>
    )
}


export const useShopContext = () => useContext(ShopContext);
