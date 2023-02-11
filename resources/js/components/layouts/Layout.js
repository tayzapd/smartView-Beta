import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from './Navbar';

const Layout  = () => {
    return (
        <main>
            <Navbar /> 
            <div className="container mt-5 ml-5">
                <Outlet />
            </div>
        </main>

    )   
}


export default Layout;