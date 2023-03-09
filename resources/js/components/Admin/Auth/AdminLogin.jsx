import { useAuthContext } from "../../../Context/AdminContext";
import { Button } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const AdminLogin = ()=>{
    // const [user,token,setUser,setToken,axios] = useAuthContext();
    // console.log(useAuthContext);
    const [login,setLogin] = useState({
        username:'',
        password:''
    })

    const Login = (e)=>{
        e.preventdefault();
    }
    return (
        <>
            <div className="col">
                Admin Login 
            </div>
        </>
    )
}

export default AdminLogin;

