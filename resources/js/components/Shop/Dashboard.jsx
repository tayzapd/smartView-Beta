import { Navbar, Nav, Container } from 'react-bootstrap';
import './css/Dashboard.css'
import { useNavigate, useParams,Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useShopContext } from '../../Context/ShopContext';
const Dashboard = () => {
    
    const {id} = useParams();
    const  {axios,user,token} = useShopContext();
    const [items,setItems] = useState([]);
    const router = useNavigate();

    
    useEffect(() => {
        if(token == null) {
            return router(`/shop/${id}/login`)
        }
        axios.post('/api/shop/items/show',{id:id}).then((res) => {
            setItems(res.data.items);
        });
    },[])


    return (
        <>
            <div className="container mt-5 ">
                <Outlet></Outlet>
            </div>
        </>
    )
}


export default Dashboard;