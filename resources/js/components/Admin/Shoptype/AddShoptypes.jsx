import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminContext } from "../../../Context/AdminContext";
import Swal from "sweetalert2";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const AddShoptypes = ()=>{
    const {axios} = useAdminContext();
    
    const [shoptypesInput,setShoptypes] = useState({
        name:'',
        remark:'',
    });

    const navigate = useNavigate();

    const handleInput = (e)=>{
        setShoptypes({...shoptypesInput,[e.target.name]:e.target.value});
    }
    // console.log(shoptypesInput);
    const saveShoptype = (e)=>{
        e.preventDefault();
        const data = {
            name:shoptypesInput.name,
            remark:shoptypesInput.remark
        }
        axios.post(`/api/admin/shoptypes/create`, data)
        .then(res=>{
            // console.log(res);
            // Swal.fire({
            //     position: 'top-end',
            //     title: 'GOOD JOB!',
            //     text: res.data.message,
            //     icon: 'success',
            //     showConfirmButton: false,
            //     timer: 1000
            //   }).then(()=>{
            //         setShoptypes({
            //             name:'',
            //             remark:''
            //         })
            //         window.location.reload(false);

            //   })

            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                window.location.reload();
            
    
        })
        
        

    }
    return(
        <>
            
            <form onSubmit={saveShoptype} id="addshoptype">
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={shoptypesInput.name} className="form-control" required/>

                </div>
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={shoptypesInput.remark} className="form-control"/>
                </div>
                
            </form>
        </>
    )
}

export default AddShoptypes;