import { useAdminContext, useAuthContext } from "../../../Context/AdminContext";
import { Button } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
const AdminLogin = ()=>{


    const {token,setToken} = useAdminContext();
    const router = useNavigate();

    const [login,setLogin] = useState({
        username:'',
        password:'',
        shop_id:1
    })

    const Login = async  (e) => {
        e.preventDefault();
        const {data} = await axios.post('/api/admin/login',login); 
        console.log(data);
        if(data.status == true){
            setToken(data.token);
            console.log(token);
            return router('/admin/');
        }
    }

    console.log(login);
    useEffect(() => {
    },[])

    return (
        <>
            <div className="col d-flex justify-content-center align-item-center mt-5 ">
                <div className="card col-6">
                    <div className="card-header">
                        <h4>
                            Admin Login 
                        </h4>
                    </div>

                    <div className="card-body">
                        <form onSubmit={Login}>
                            <input placeholder="username" type="text" name="username" className="my-2 form-control" onChange={(e) => {setLogin({...login,[e.target.name]:e.target.value})}}  />
                            <input placeholder="password" type="password" name="password" className="my-2 form-control" onChange={(e) => {setLogin({...login,[e.target.name]:e.target.value})}}  />

                            <input type="submit" value="Submit" className="btn btn-primary " />
                        </form>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default AdminLogin;

