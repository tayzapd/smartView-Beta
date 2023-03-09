import ShopNavbar from "./Navbar/Shop";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Container,Navbar,Nav } from "react-bootstrap";
import { useShopContext } from "../../Context/ShopContext";
import { useEffect } from "react";


const ShopLayout = () => {
    const {dialog,token,axios} = useShopContext();
    const nav = useNavigate();
    const router = useLocation();
    const route  = useNavigate();
    const {id} = useParams();


    useEffect(() => {
        if(token != null){
            axios.get(`/api/user`).then(({data}) => {
                if(data.shop_id == id){
                    return 0;
                }else {
                    route(`/shop/${id}/login`)
                }
            })
        }
    },[])
    return (
    <>
        <Outlet  />

        {router.pathname.includes('login') != true && dialog != true ?
        <Navbar fixed="bottom" className='container   mb-2 rounded-pill text-center '>

            <Nav.Link className='col-3' onClick={()=> {nav(`/shop/${id}/owner/items`)}}>ITEM</Nav.Link>
            <Nav.Link className='col-3' onClick={()=> {nav(`/shop/${id}/owner/category`)}}
                >CATEGORY</Nav.Link>
            <Nav.Link className='col-3' onClick={()=> {nav(`/shop/${id}/owner/shop`)}}
                >SHOP</Nav.Link>
            <Nav.Link className='col-3' onClick={()=> {nav(`/shop/${id}/owner/user`)}}
                >USER</Nav.Link>
        </Navbar> :
        <span></span>}

        <style>
            {
                ` .navbar {
                    padding: 0.5rem 0;
                    background-color: white;
                    box-shadow: 0px -2px -2px rgba(0, 0, 0, 0.1);
                    z-index: 10px;
                }

                .nav-link {
                    color: #333;
                    font-weight: 500;
                    font-size: 0.9rem;
                }

                .nav-link:hover {
                    color: #3f51b5;
                }

                `
            }

        </style>
    </>
    )
}

export default ShopLayout;
