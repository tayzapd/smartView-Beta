import { useUserContext,UserProvider } from "../../Context/UserContext";
import UserLayout from "./UserLayout";
const User = () => {
    const {setToken,token} = useUserContext();
    return (
        <UserProvider>
            <UserLayout  />
        </UserProvider>
    )
}

export default User;