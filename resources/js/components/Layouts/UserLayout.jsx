
import UserNavbar from "./Navbar/User";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Container,Navbar,Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useUserContext } from "../../Context/UserContext";

const UserLayout = () => {
    const route = useNavigate();
    const {setShop,dialog} = useUserContext();
    const router = useLocation();
    const {id} = useParams();
    const getShopInfo = () => {
        axios.post('/api/user/shop/info/',{id:id}).then((res) => {
            setShop(res.data.shop);
        })
    }

    useEffect(() => {
        getShopInfo();
        document.body.style.backgroundColor = "#fcffa3";
    },[])
    return (
        <div >
            {
                dialog != true ? 
                <UserNavbar  /> : <span></span>
            
            }
            <Outlet /> 
        
        </div>
    )
}

export default UserLayout;