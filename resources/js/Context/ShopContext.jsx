import { createContext,useContext,useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const ShopContext = createContext({
    user:null,
    dialog:false,
    token:localStorage.getItem('shop_token'),
    axios:null,
    setUser: () => {},
    setToken: () => {},
    users:[],
    setUsers:() =>{}
});


export const ShopProvider = ({children}) => {
    const [user,_setUser] = useState({});
    const [dialog,setDialog] = useState(false);
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
    

    useEffect(() => {
        axios.get('/api/user').then(({data}) => {
            setUser(data)
        })
    },[])

    return (
        <ShopContext.Provider value={{
            user,
            token,
            users,
            setUser,
            setUsers,
            setToken,
            axios,
            dialog,
            setDialog
        }} >
            {children}
        </ShopContext.Provider>
    )
}


export const useShopContext = () => useContext(ShopContext);
