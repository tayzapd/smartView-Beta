import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminContext } from "../../../Context/AdminContext";



const AddDivisions = ()=>{
    const {axios} = useAdminContext();
    const [divisionsInput,setDivisions] = useState({
        name:'',
        remark:'',
    });

    const navigate = useNavigate();

    const handleInput = (e)=>{
        setDivisions({...divisionsInput,[e.target.name]:e.target.value});
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
            console.log(res);

            setDivisions({
                name:'',
                remark:''
            })

            window.location.reload(true); 
        })
         

    }
    return(
        <>
            <form onSubmit={saveDivision} id="adddivision">
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={divisionsInput.name} className="form-control" required/>

                </div> 
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={divisionsInput.remark} className="form-control" required/>
                </div>
                
            </form>
        </>
    )
}

export default AddDivisions;