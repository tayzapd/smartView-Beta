import { useEffect } from "react";
import { useParams,useLocation } from "react-router-dom";
import { useShopContext } from "../../Context/ShopContext";

const Users =  () => {
    const {user,token,users,setUsers,axios} = useShopContext();
    // const getUsers = () => {
    //     axios.post('/api/shop/users/show').then(({data}) => {
    //         setUsers(data.users);
            
    //     })
    // }

    useEffect(() => {
    },[])

    console.log(users)
    return (
        <div>
             Helo 
        </div>
    )
}

export default Users;