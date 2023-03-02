import { ShopProvider,useShopContext } from "../../Context/ShopContext";
import Shop from './Shop';

const ShopLayout = () => {
    const {setToken,token} = useShopContext();
    return (
        <ShopProvider>
            <Shop />
        </ShopProvider>
    )
}

export default ShopLayout;