import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminContext } from "../../../Context/AdminContext";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const AddDivisions = ({handleClose})=>{
    
    const {axios,divisions,setDivisions} = useAdminContext();
    const [divisionsInput,setDivisionsInput] = useState({
        name:'',
        remark:'',
        error_list:[],
    });

    const navigate = useNavigate();
    const getDivisions = ()=>{
        axios.post(`/api/admin/divisions/show`).then(res=>{
            
            // console.log(res);
            setDivisions(res.data);
           
        })
    }
    const handleInput = (e)=>{
        setDivisionsInput({...divisionsInput,[e.target.name]:e.target.value});
    }
    // console.log(divisionsInput);
    const saveDivision = (e)=>{
        e.preventDefault();
        const data = {
            name:divisionsInput.name,
            remark:divisionsInput.remark
        }
        // console.log(data);
        axios.post(`/api/admin/divisions/create`, data)
        .then(res=>{
            // console.log(res);
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
            getDivisions();

        }).catch((err)=>{
            // console.log(err.response.data.error);
            setDivisionsInput({...divisionsInput,error_list:err.response.data.error});
            
        })
    }
    return(
        <>
            <form onSubmit={saveDivision} id="adddivision">
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={divisionsInput.name} className="form-control"/>
                    <span className="text-danger">{divisionsInput.error_list.name}</span>

                </div> 
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={divisionsInput.remark} className="form-control" />
                </div>
                
            </form>
        </>
    )
}

export default AddDivisions;