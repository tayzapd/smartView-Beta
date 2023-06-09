import { useState,useEffect } from "react";
import { useAdminContext } from "../../../Context/AdminContext";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const AddCity = ({handleClose}) => {
    const {axios,cities,setCities} = useAdminContext();
    const [citiesInput,setCitiesInput] = useState({
        name:'',
        remark:'',
        error_list:[],
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

    const getCities = () => {
        axios.post(`/api/admin/cities/show`).then(({data})=>{
            // console.log(res);
            setCities(data);
        })
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
            console.log(res);
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
                getCities();
        }).catch((err)=>{
            // console.log(err.response.data.error);
            setCitiesInput({...citiesInput,error_list:err.response.data.error});
            
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
                    <span className="text-danger">{citiesInput.error_list.division_id}</span>

                </div>
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={citiesInput.name} className="form-control"/>
                    <span className="text-danger">{citiesInput.error_list.name}</span>
                </div> 
                
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={citiesInput.remark} className="form-control"/>
                </div>
                
            </form>
        </>
    )
}

export default AddCity;