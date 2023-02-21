import { createContext,useContext,useState } from "react";
import axios from "axios";

const UserContext = createContext({
    user:null,
    token:null,
    axios:null,
    setUser: () => {},
    setToken: () => {},
    users:[],
    setUsers:() =>{}
});


export const UserProvider = ({children}) => {
    const [user,_setUser] = useState({});
    const [users,setUsers] = useState([]);
    const [token,_setToken] = useState(localStorage.getItem('user_token'));

    const setToken = (token) => {
        _setToken(token);
        if(token){
            localStorage.setItem('user_token',token);
        }else {
            localStorage.removeItem('user_token');
        }
    }

    const setUser = (user) => {
        _setUser(user);
    }
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    

    return (
        <UserContext.Provider value={{
            user,
            token,
            users,
            setUser,
            setUsers,
            setToken,
            axios
        }} >
            {children}
        </UserContext.Provider>
    )
}


export const useShopContext = () => useContext(UserContext);
