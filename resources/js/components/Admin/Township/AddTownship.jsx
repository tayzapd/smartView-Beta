import axios from "axios";
import { useEffect, useState } from "react"
import { useAdminContext } from "../../../Context/AdminContext";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddTownship = () =>{
    const {axios,townships,setTownships} = useAdminContext();
    const [townshipsInput,setTownshipsInput] = useState({
        name:'',
        remark:''
    })

    const [cities,setCities] = useState([]);
    const [selectInput,setSelect] = useState([]);

    const getTownships = ()=>{
        axios.post(`/api/admin/townships/show`).then((res)=>{
            // console.log(res);
            setTownships(res.data);
        })
    }

    useEffect(()=>{
        const getcities = ()=>{
            axios.post(`/api/admin/cities/show`).then((res)=>{
                // console.log(res);
                setCities(...cities,res.data);
            })
        }

        getcities();
    },[])



    const handleInput = (e)=>{
        setTownshipsInput({...townshipsInput,[e.target.name]:e.target.value});
    }

    // console.log(townshipsInput);
    // console.log(selectInput);
    const saveTownship = (e)=>{
        e.preventDefault();
        const data = {
            name:townshipsInput.name,
            remark:townshipsInput.remark,
            city_id:selectInput
        }

        // console.log(data);
        axios.post(`/api/admin/townships/create/`,data).then((res)=>{
            console.log(res);
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
            getTownships();
        })
    }
    return(
        <>
            <form onSubmit={saveTownship} id="addtownship">
            <div className="mb-2">
                    <label>City</label>
                    
                    <select name="city" onChange={(e)=>setSelect(...selectInput,e.target.value)} value={selectInput.division_id}   className="form-select">
                    <option>Select City</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={townshipsInput.name} className="form-control" required/>

                </div> 
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={townshipsInput.remark} className="form-control" required/>
                </div>
                
            </form>
        </>
    )
}

export default AddTownship;