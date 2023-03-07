import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8000/";

const AddShoptypes = ()=>{
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
            <form onSubmit={saveShoptype} id="addshoptype">
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={shoptypesInput.name} className="form-control" required/>

                </div>
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={shoptypesInput.remark} className="form-control" required/>
                </div>
                {/* <div className="mb-2 float-end">
                    <button type="submit" className="btn btn-dark">Add</button>
                </div> */}
            </form>
        </>
    )
}

export default AddShoptypes;