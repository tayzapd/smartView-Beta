import { BrowserRouter,createBrowserRouter,Link } from "react-router-dom";
import NotFound from './components/Layouts/NotFound';
import Home from './components/Home';
import UserLayout from "./components/Layouts/UserLayout";
import AdminLayout from "./components/Layouts/AdminLayout";
import ShopLayout from "./components/Layouts/ShopLayout";
import Dashboard from "./components/Shop/Dashboard.jsx";
import Items from "./components/Shop/Items";
import Users from "./components/Shop/Users";
import Categories from "./components/Shop/Category";
import ItemView from './components/User/ItemView';
import ShopLogin from "./components/Shop/Auth/Login";

const router = createBrowserRouter([
    {
        path:"/",
        element:<UserLayout />,
        children:[
            {
                path:'/sh/:id/',
                element:<ItemView/>
            }
        ]
    },
    {
        path:"/admin",
        element:<AdminLayout /> 
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