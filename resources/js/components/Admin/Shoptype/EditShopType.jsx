import { useEffect, useState } from "react";
import { useAdminContext } from "../../../Context/AdminContext";

axios.defaults.baseURL = "http://localhost:8000/";

const EditShopType = () => {

    const {shoptype} = useAdminContext();
    const [shoptypesInput,setShoptypes] = useState({
        id:shoptype.id,
        name:shoptype.name,
        remark:shoptype.remark
    })
    const handleInput = (e)=>{
        setShoptypes({...shoptypesInput,[e.target.name]:e.target.value});

    }
    console.log(shoptypesInput);
    // useEffect(() => {
    //     console.log(`ShopType name : ${shoptype.name}`)
    // },[])
    const updateShoptype = (e)=>{
        e.preventDefault();
        const data = {
            id:shoptypesInput.id,
            name:shoptypesInput.name,
            remark:shoptypesInput.remark
        }
        axios.post(`/api/admin/shoptypes/update`, data)
        .then(res=>{
            console.log(res);

            setShoptypes({
                name:'',
                remark:''
            })

            window.location.reload(true);  
        })
    }
    return(
        <>
            <form onSubmit={updateShoptype} id="updateshoptype">
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={shoptypesInput.name} className="form-control" required/>

                </div>
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={shoptypesInput.remark} className="form-control" required/>
                </div>
            </form>
        </>
    )
}

export default EditShopType