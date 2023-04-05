import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminContext } from "../../../Context/AdminContext";
import Swal from "sweetalert2";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddShoptypes = ({handleClose})=>{
    const {axios,shoptypes,setShopTypes} = useAdminContext();
    
    const [shoptypesInput,setShoptypes] = useState({
        name:'',
        remark:'',
        error_list:[],
    });

    const navigate = useNavigate();

    const handleInput = (e)=>{
        setShoptypes({...shoptypesInput,[e.target.name]:e.target.value});
    }
    // console.log(shoptypesInput);

    const getShoptypes = async () => {
        const res = await axios.post(`/api/admin/shoptypes/show`);
        console.log(res.data);
        setShopTypes(res.data);

    }
    const saveShoptype = (e)=>{
        e.preventDefault();
        const data = {
            name:shoptypesInput.name,
            remark:shoptypesInput.remark
        }
        axios.post(`/api/admin/shoptypes/create`, data)
        .then(res=>{
            handleClose();
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
        }).catch((err)=>{
            setShoptypes({...shoptypesInput,error_list:err.response.data.error});
            
        })
        
        

    }
    return(
        <>

            <form onSubmit={saveShoptype} id="addshoptype">
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={shoptypesInput.name} className="form-control" />
                    <span className="text-danger">{shoptypesInput.error_list.name}</span>

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