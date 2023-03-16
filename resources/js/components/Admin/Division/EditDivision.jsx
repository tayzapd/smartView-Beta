import { useEffect, useState } from "react";
import { useAdminContext } from "../../../Context/AdminContext"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const EditDivision = () => { 
    const {division,axios,divisions,setDivisions} = useAdminContext();

    const [divisionInput,setDivisionInput] = useState({
        id:division.id,
        name:division.name,
        remark:division.remark 
    })

    const getDivisions = ()=>{
        axios.post(`/api/admin/divisions/show`).then(res=>{
            
            // console.log(res);
            setDivisions(res.data);
           
        })
    }
    useEffect(() => {
        getDivisions();
    },[])

    
    const handleInput = (e)=>{
        setDivisionInput({...divisionInput,[e.target.name]:e.target.value});

    }

    const updateDivision = (e)=>{
        e.preventDefault();
        const data = {
            id:divisionInput.id,
            name:divisionInput.name,
            remark:divisionInput.remark
        }
        axios.post(`/api/admin/divisions/update`, data)
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
            getDivisions();
        })
    }
    return(
        <>
            <form onSubmit={updateDivision} id="updatedivision">
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={divisionInput.name} className="form-control" required/>

                </div>
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={divisionInput.remark} className="form-control" required/>
                </div>
            </form>
        </>
    )
}

export default EditDivision;