import axios from "axios";
import { useState,useEffect } from "react";
import { useAdminContext } from "../../../Context/AdminContext";



const AddCity = () => {
    const {axios} = useAdminContext();
    const [citiesInput,setCitiesInput] = useState({
        name:'',
        remark:''
    })

    const [divisions,setDivisions] = useState([]);
    const [selectInput,setSelect] = useState([]);


    useEffect(()=>{
        axios.post(`/api/admin/divisions/show/`).then(res=>{
            // console.log(res);
            setDivisions(...divisions,res.data);
           
        })
    },[])

    // console.log(divisions);
    const handleInput = (e)=>{
        setCitiesInput({...citiesInput,[e.target.name]:e.target.value});

    }
    // console.log(citiesInput);
    // console.log(selectInput);

    const saveCity = (e)=>{
        e.preventDefault();
        const data = {
            name:citiesInput.name,
            remark:citiesInput.remark,
            division_id:selectInput
        }

        // console.log(data);
        axios.post(`/api/admin/cities/create/`,data).then((res)=>{
            // console.log(res);
            setCitiesInput({
                name:'',
                remark:'',
            })

            setSelect([]);
        })
    }
    return(
        <>
            <form onSubmit={saveCity} id="addcity">
                <div className="mb-2">
                    <label>Division</label>
                    
                    <select name="division" onChange={(e)=>setSelect(...selectInput,e.target.value)}   className="form-select">
                    <option>Select Division</option>
                        {divisions.map((division, index) => (
                            <option key={index} value={division.id}>
                                {division.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={citiesInput.name} className="form-control" required/>

                </div> 
                
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={citiesInput.remark} className="form-control" required/>
                </div>
                
            </form>
        </>
    )
}

export default AddCity;