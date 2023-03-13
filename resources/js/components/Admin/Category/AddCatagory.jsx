import { useEffect, useState } from "react"
import { useAdminContext } from "../../../Context/AdminContext"

const AddCategory = ()=>{
    const {axios} = useAdminContext();
    const [categoriesInput,setCategoriesInput] = useState({
        name:'',
        remark:'',
    })

    const [selectInput,setSelect] = useState('')
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

    // console.log(shops);
    const handleInput = (e)=>{
        setCategoriesInput({...categoriesInput,[e.target.name]:e.target.value});
    }

    // console.log(categoriesInput);
    // console.log(selectInput);

    const saveCategory = (e)=>{
        e.preventDefault();
        const data = {
            name:categoriesInput.name,
            remark:categoriesInput.remark,
            shop_id:selectInput
        }

        // console.log(data);

        axios.post(`/api/admin/category/create`,data).then((res)=>{
            // console.log(res);
            setCategoriesInput({
                name:'',
                remark:''
            })

            setSelect({})
            window.location.reload(true); 
        })
    }
    return(
        <>
            <form onSubmit={saveCategory} id="addcategory">
            <div className="mb-2">
                    <label>Shop</label>
                    
                    <select name="shop" onChange={(e)=>setSelect(...selectInput,e.target.value)}  className="form-select">
                    <option>Select Shop</option>
                        {shops.map((shop, index) => (
                            <option key={index} value={shop.id}>
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

export default AddCategory;