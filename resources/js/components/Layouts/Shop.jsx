
import ShopNavbar from "./Navbar/Shop";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container,Navbar,Nav } from "react-bootstrap";
import { useShopContext } from "../../Context/ShopContext";
import { useEffect } from "react";


const ShopLayout = () => {
    const {token,setUser,user,setToken} = useShopContext();
    const route = useNavigate();
    const router = useLocation();
    useEffect(() => {
    },[])
    return (
        <>
                <Outlet /> 
                
                {router.pathname.includes('login') != true ? <Navbar  fixed="bottom" className='navbar container mx-2 mx-lg-5 shadow-lg border border-top' >      

                        <Nav.Link className='col-3' href="#">ITEM</Nav.Link>
                        <Nav.Link className='col-3' href="#">CATEGORY</Nav.Link>
                        <Nav.Link className='col-3' href="#">SHOP</Nav.Link>
                          <Nav.Link className='col-3' href="#">USER</Nav.Link>
                </Navbar> : <span></span>}
            
              <style>{`
              .navbar {
                padding: 1rem 0;
                background-color: white;
                box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
                box-shadow: rgba(60, 64, 67, 0.3) 0px -10px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
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