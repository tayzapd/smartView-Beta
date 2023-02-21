import { BrowserRouter,createBrowserRouter,Link } from "react-router-dom";
import NotFound from './components/Layouts/NotFound';
import Home from './components/Home';
import UserLayout from "./components/Layouts/UserLayout";
import AdminLayout from "./components/Layouts/AdminLayout";
import ShopLayout from "./components/Layouts/ShopLayout";
import Dashboard from "./components/Shop/Dashboard";

const Shop = () => {
    return (
        <div>
            Hello Shop
        </div>
    )
}
const router = createBrowserRouter([
    {
        path:"/",
        element:<UserLayout />
    },
    {
        path:"/admin",
        element:<AdminLayout /> 
    },
    {
        path:"/shop/:name",
        element:<ShopLayout /> ,
        children:[
            {
                path:'owner',
                element:<Dashboard /> 

            },
            {
                path:'user'
            }
            
        ]
    },
    
    {
        path:"*",
        element:<NotFound />
    }
]); 


export default router;