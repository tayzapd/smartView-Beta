import { useEffect, useState } from "react";
import { useAdminContext } from "../../../Context/AdminContext";

const EditCategory = () => {
    const {category,axios} = useAdminContext();
    const [categoriesInput,setCategoriesInput] = useState({
        id:category.id,
        name:category.name,
        remark:category.remark,
    });

    const [selectInput,setSelect] = useState({
        shop_id:category.shop_id
    });

    const [shops,setShops] = useState([]);

    const getShops = ()=>{
        axios.post(`/api/admin/shops/show`).then((res)=>{
            // console.log(res);
            setShops(...shops,res.data.shops);
        })
    }
    useEffect(()=>{
        getShops();
    },[])

    const handleInput = (e)=>{
        setCategoriesInput({...categoriesInput,[e.target.name]:e.target.value});

    }
    const updataCategory = (e)=>{
        e.preventDefault();
        const data = {
                id:categoriesInput.id,
                name:categoriesInput.name,
                remark:categoriesInput.remark,
                shop_id:selectInput.shop_id
            }

        axios.post(`/api/admin/categories/update`,data)
        .then((res)=>{
            setCategoriesInput({
                name:'',
                remark:''

            })

            setSelect({});
            window.location.reload(false); 
            
        })
    }
    return(
        <>
            <form onSubmit={updataCategory} id="updatecategory">
            <div className="mb-2">
                    <label>Shop</label>
                    
                    <select name="shop" onChange={(e)=>setSelect({...selectInput,shop_id:e.target.value})} value={selectInput.shop_id}  className="form-select">
                    <option>Select Shop</option>
                        {shops.map((shop, index) => (
                            <option key={index} value={shop.id} selected={(shop.id == selectInput.shop_id)?'selected':''}>
                                {shop.shop_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={categoriesInput.name} className="form-control" required/>

                </div> 
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={categoriesInput.remark} className="form-control" required/>
                </div>
                
            </form>
        </>
    )
}

export default EditCategory;