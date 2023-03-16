import { useEffect, useState } from "react"
import { useAdminContext } from "../../../Context/AdminContext"
import { toast, ToastContainer } from 'react-toastify' ;
import "react-toastify/dist/ReactToastify.css";

const AddCategory = ()=>{
    const {axios,categories,setCategories} = useAdminContext();
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

    const getCategories = ()=>{
        axios.post(`/api/admin/categories/showAll`).then(({data})=>{
            // console.log(data);
            setCategories(data);
        })
    }
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

        axios.post(`/api/admin/categories/create`,data).then((res)=>{
            console.log(res);
            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            getCategories();
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