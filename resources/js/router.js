import { BrowserRouter,createBrowserRouter,Link } from "react-router-dom";
import NotFound from './components/Layouts/NotFound';
import Home from './components/Home';
import User from "./components/Layouts/User";
import AdminLayout from "./components/Layouts/AdminLayout";
import ShopLayout from "./components/Layouts/ShopLayout";
import Dashboard from "./components/Shop/Dashboard.jsx";
import Items from "./components/Shop/Items";
import ShopQRCode from "./components/Shop/QrCode";
import Categories from "./components/Shop/Category";
import ItemView from './components/User/ItemView';
import ShopLogin from "./components/Shop/Auth/Login";
import AddShoptypes from "./components/Admin/Shoptype/AddShoptypes";
import AdminLogin from "./components/Admin/Auth/AdminLogin";
import UsersList from "./components/Admin/User/UserList";
import ListShopTypes from "./components/Admin/Shoptype/ListShoptypes";
import ListDivisions from "./components/Admin/Division/ListDivisions";
import ListCities from "./components/Admin/City/ListCities";
import ListTownships from "./components/Admin/Township/ListTownships";
import AdminQrCode from './components/Admin/QrCode';
import { element } from "prop-types";
import ListShops from "./components/Admin/Shop/ListShops";

import ShopProfile from "./components/Shop/Shop";
import ListCategories from "./components/Admin/Category/ListCategories";
import AdminItems from "./components/Admin/Items";
import DeletedCategoriesRecord from "./components/Admin/Category/DeletedCategoriesRecord";
import DeletedCitiesRecord from "./components/Admin/City/DeletedCitiesRecord";
import DeletedDivisionsRecord from "./components/Admin/Division/DeletedDivisionsRecord";
import DeletedShopsRecord from "./components/Admin/Shop/DeletedShopsRecord";
import DeletedShoptypesRecord from "./components/Admin/Shoptype/DeletedShoptypesRecord";
import DeletedTownshipsRecord from "./components/Admin/Township/DeleteTownshipsRecord";
import DeletedUsersRecord from "./components/Admin/User/DeletedUsersRecord";

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
                path:'login',
                element:<AdminLogin />
            },
            {
                path:"shoptypes/add",
                element:<AddShoptypes/>
            },
            {

                path:"shoptypes",
                element:<ListShopTypes/>
            },
            {
                
                path:"shoptypes/detetedrecord",
                element:<DeletedShoptypesRecord/>
                
            },
            {
                
                path:"divisions",
                element:<ListDivisions/>
                
            },
            {
                
                path:"divisions/detetedrecord",
                element:<DeletedDivisionsRecord/>
                
            },
            {
                
                path:"cities",
                element:<ListCities/>
                
            },
            {
                
                path:"cities/detetedrecord",
                element:<DeletedCitiesRecord/>
                
            },
            {
                
                path:"townships",
                element:<ListTownships/>
                
            },
            {
                
                path:"townships/detetedrecord",
                element:<DeletedTownshipsRecord/>
                
            },
            {
                
                path:"shops",
                element:<ListShops/>
                
            },
            {
                
                path:"shops/detetedrecord",
                element:<DeletedShopsRecord/>
                
            },
            {
                
                path:"categories",
                element:<ListCategories/>
                
            },
            {
                
                path:"categories/detetedrecord",
                element:<DeletedCategoriesRecord/>
                
            },
            {
                path:'items',
                element:<AdminItems /> 
            },
            {
                path:'qrcode',
                element:<AdminQrCode /> 
            },
            {
                path:'users',
                element:<UsersList /> 
            },
            {
                
                path:"users/detetedrecord",
                element:<DeletedUsersRecord/>
                
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
                        path:'myqrcode',
                        element:<ShopQRCode /> 
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