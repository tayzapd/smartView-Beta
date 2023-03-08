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
import ShopProfile from "./components/Shop/Shop";
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
        path:"adminlogin",
        element:<AdminLogin/>
    },
    {
        path:"/admin",
        element:<AdminLayout />,
        children:[
            {
                path:"addshoptypes",
                element:<AddShoptypes/>
            }
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
