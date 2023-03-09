import { BrowserRouter,createBrowserRouter,Link } from "react-router-dom";
import NotFound from './components/Layouts/NotFound';
import Home from './components/Home';
import User from "./components/Layouts/User";
import AdminLayout from "./components/Layouts/AdminLayout";
import ShopLayout from "./components/Layouts/ShopLayout";
import Dashboard from "./components/Shop/Dashboard.jsx";
import Items from "./components/Shop/Items";
import Users from "./components/Shop/Users";
import Categories from "./components/Shop/Category";
import ItemView from './components/User/ItemView';
import ShopLogin from "./components/Shop/Auth/Login";
import AddShoptypes from "./components/Admin/Shoptype/AddShoptypes";
import AdminLogin from "./components/Admin/Auth/AdminLogin";
import ListShopTypes from "./components/Admin/Shoptype/ListShoptypes";
import ListDivisions from "./components/Admin/Division/ListDivisions";
import ListCities from "./components/Admin/City/ListCities";
import ShopProfile from "./components/Shop/Shop";
import ListTownships from "./components/Admin/Township/ListTownships";
import ListShops from "./components/Admin/Shop/ListShops";

const router = createBrowserRouter([
    {
        path:"/",
        element:<User />,
        children:[
            {
                path:'/sh/:id/',
                element:<ItemView/>
            }
        ]
    },
    
    {
        path:"/admin",
        element:<AdminLayout />, 
        children:[
            {
                path:"shoptypes",
                element:<ListShopTypes/>
            },
            {
                
                path:"divisions",
                element:<ListDivisions/>
                
            },
            {
                
                path:"cities",
                element:<ListCities/>
                
            },
            {
                
                path:"townships",
                element:<ListTownships/>
                
            },
            {
                
                path:"shops",
                element:<ListShops/>
                
            },
        ]
    },
    {
        path:"/shop/:id",
        element:<ShopLayout /> ,
        children:[
            {
                path:'login',
                element:<ShopLogin />
            },
            {
                path:'owner',
                element:<Dashboard /> ,
                children:[
                    {
                        path:'items',
                        element:<Items />

                    },
                    {
                        path:'users',
                        element:<Users /> 
                    },
                    {
                        path:'category',
                        element:<Categories /> 
                    },
                    {
                        path:'shop',
                        element:<ShopProfile />
                    }

                ]
            },
         
            
        ]
    },
    
    {
        path:"*",
        element:<NotFound />
    }
]); 


export default router;