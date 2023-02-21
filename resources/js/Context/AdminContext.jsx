import { createContext,useContext,useState } from "react";
import axios from "axios";

const AdminContext = createContext({
    user:null,
    token:null,
    axios:null,
    setUser: () => {},
    setToken: () => {},
    users:[],
    setUsers:() =>{}
});


export const AdminProvider = ({children}) => {
    const [user,_setUser] = useState({});
    const [users,setUsers] = useState([]);
    const [token,_setToken] = useState(localStorage.getItem('admin_token'));

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
            setToken,
            axios
        }} >
            {children}
        </AdminContext.Provider>
    )
}


export const useAuthContext = () => useContext(AdminContext);