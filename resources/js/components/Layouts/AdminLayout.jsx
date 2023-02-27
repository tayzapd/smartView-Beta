
import { useContext } from "react";
import { useAuthContext } from "../../Context/AdminContext";
import AdminNavbar from "./Navbar/Admin";

const AdminLayout = () => {
    
    console.log(useAuthContext());
    return (
        <>
            <AdminNavbar /> 
            <br />          
            <div className="container">
                Admin Layout
            </div>    
        </>
    )
}

export default AdminLayout;