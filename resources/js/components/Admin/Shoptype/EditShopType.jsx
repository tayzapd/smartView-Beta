import { useEffect, useState } from "react";
import { useAdminContext } from "../../../Context/AdminContext";
import { toast, ToastContainer } from 'react-toastify';



const EditShopType = () => {

    const {shoptype,axios,shoptypes,setShopTypes} = useAdminContext();
    const [shoptypesInput,setShoptypes] = useState({
        id:shoptype.id,
        name:shoptype.name,
        remark:shoptype.remark
    })
    const handleInput = (e)=>{
        setShoptypes({...shoptypesInput,[e.target.name]:e.target.value});

    }
    // console.log(shoptypesInput);
    const getShoptypes = async () => {
        const res = await axios.post(`/api/admin/shoptypes/show`);
        console.log(res.data);
        setShopTypes(res.data);

    }

    const updateShoptype = (e)=>{
        e.preventDefault();
        const data = {
            id:shoptypesInput.id,
            name:shoptypesInput.name,
            remark:shoptypesInput.remark
        }

        axios.post(`/api/admin/shoptypes/update`, data)
        .then(res=>{
            // console.log(res);
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
            getShoptypes();

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