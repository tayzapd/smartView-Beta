
import UserNavbar from "./Navbar/User";
import { Outlet } from "react-router-dom";
const UserLayout = () => {
    return (
        <>
            <UserNavbar /> 
            


            <div>
                <Outlet />
            </div>
        </>
    )
}

export default UserLayout;