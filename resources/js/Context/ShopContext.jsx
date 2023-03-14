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
    setUsers:() =>{},
    getUser:() =>{},
    id:0,
    setId:() => {}
});


export const ShopProvider = ({children}) => {
    const [user,setUser] = useState({});
    const [id,setId] = useState(1);
    const [dialog,setDialog] = useState(false);
    const [users,setUsers] = useState([]);
    const [token,_setToken] = useState(localStorage.getItem('shop_token'));
    const [itemEdit,setItemEdit] = useState(false);

    const setToken = (token) => {
        _setToken(token);
        if(token){
            localStorage.setItem('shop_token',token);
        }else {
            localStorage.removeItem('shop_token');
        }
    }


    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    



    const getUser = () => {
        let user;
        axios.get('/api/user').then(({data}) => {
            user = data;
        })
        return user;
    }
    return (
        <ShopContext.Provider value={{
            id,
            setId,
            user,
            token,
            users,
            setUser,
            setUsers,
            setToken,
            axios,
            dialog,
            setDialog,
            getUser,
            itemEdit,
            setItemEdit
        }} >
            {children}
        </ShopContext.Provider>
    )
}


export const useShopContext = () => useContext(ShopContext);
