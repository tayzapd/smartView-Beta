
import ShopNavbar from "./Navbar/Shop";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container,Navbar,Nav } from "react-bootstrap";
import { useShopContext } from "../../Context/ShopContext";
import { useEffect } from "react";


const ShopLayout = () => {
    const {token,setUser,user,setToken,dialog} = useShopContext();
    const route = useNavigate();
    const router = useLocation();
    useEffect(() => {
    },[])
    return (
        <>
                <Outlet /> 
                
                {router.pathname.includes('login') != true && dialog != true ? 
                <Navbar  fixed="bottom" className='container   mb-4 rounded-pill text-center '>      

                        <Nav.Link className='col-3' href="#">ITEM</Nav.Link>
                        <Nav.Link className='col-3' href="#">CATEGORY</Nav.Link>
                        <Nav.Link className='col-3' href="#">SHOP</Nav.Link>
                        <Nav.Link className='col-3' href="#">USER</Nav.Link>
                </Navbar> : 
                <span></span>}
            
              <style>{`
              .navbar {
                padding: 1rem 0;
                background-color: white;
                box-shadow: 0px -2px -2px rgba(0, 0, 0, 0.1);
                z-index:20px;
              }
              
              .nav-link {
                color: #333;
                font-weight: 500;
                font-size: 0.9rem;
              }
              .nav-link:hover {
                color: #3f51b5;
              }
            `}</style>
        </>
    )
}

export default ShopLayout;