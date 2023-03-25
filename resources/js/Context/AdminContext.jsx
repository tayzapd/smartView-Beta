import { createContext,useContext,useState } from "react";
import axios from "axios";

const AdminContext = createContext({
    user:null,
    token:null,
    axios:null,
    dialog:false,
    shoptype:{},
    division:{},
    city:{},
    township:{},
    shop:{},
    category:{},
    setUser: () => {},
    setToken: () => {},
    users:[],
    setUsers:() =>{},
    cities:[],
    setCities:() => {},
    categories:[],
    setCategories:() => {},
    divisions:[],
    setDivisions:() => {},
    shops:[],
    setShops:() => {},
    shoptypes:[],
    setShopTypes:() => {},
    townships:[],
    setTownships:() => {},
});


export const AdminProvider = ({children}) => {
    const [user,_setUser] = useState({});
    const [users,setUsers] = useState([]);
    const [dialog,setDialog] = useState(false);
    const [cities,setCities] = useState([]);
    const [categories,setCategories] = useState([]);
    const [divisions,setDivisions] = useState([]);
    const [shops,setShops] = useState([]);
    const [shoptypes,setShopTypes] = useState([]);
    const [townships,setTownships] = useState([]);
    const [token,_setToken] = useState(localStorage.getItem('admin_token'));
    const [shoptype,setShopType] = useState({});
    const [division,setDivision] = useState({});
    const [city,setCity] = useState({});
    const [township,setTownship] = useState({});
    const [shop,setShop] = useState({});
    const [category,setCategory] = useState({});

    const setToken = (token) => {
        _setToken(token);
        if(token){
            localStorage.setItem('admin_token',token);
        }else {
            localStorage.removeItem('admin_token');
        }
    }

    const setUser = (user) => {
        _setUser(user);
    }
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    

    return (
        <AdminContext.Provider value={{
            user,
            token,
            users,
            setUser,
            setUsers,
            dialog,
            setDialog,
            setToken,
            axios,
            shoptype,
            setShopType,
            division,
            setDivision,
            city,
            setCity,
            township,
            setTownship,
            shop,
            setShop,
            category,
            setCategory,
            cities,
            setCities,
            categories,
            setCategories,
            divisions,
            setDivisions,
            shops,
            setShops,
            shoptypes,
            setShopTypes,
            townships,
            setTownships,
        }} >
            {children}
        </AdminContext.Provider>
    )
}


export const useAdminContext = () => useContext(AdminContext);
