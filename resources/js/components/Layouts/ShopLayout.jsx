import { ShopProvider,useShopContext } from "../../Context/ShopContext";
import Shop from './Shop';

const ShopLayout = () => {
    const {setToken,token} = useShopContext();
    console.log("TOken:: "+token)
    return (
        <ShopProvider>
            {token}
            <Shop />
        </ShopProvider>
    )
}

export default ShopLayout;