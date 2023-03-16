import { useEffect, useState } from "react";
import { useAdminContext } from "../../../Context/AdminContext"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const EditCity = () => {
    const {city,axios,setCities,cities} = useAdminContext();
    const [citiesInput,setCitiesInput] = useState({
        id:city.id,
        name:city.name,
        remark:city.remark,
    })
    const [divisions,setDivisions] = useState([]);
    const [selectInput,setSelect] = useState({
        division_id:city.division_id
    });
    // console.log(selectInput);

    const getCities = () => {
        axios.post(`/api/admin/cities/show`).then(({data})=>{
            // console.log(res);
            setCities(data);
        })
    }


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

    const updateCity = (e)=>{
        e.preventDefault();
        const data = {
            id:citiesInput.id,
            name:citiesInput.name,
            remark:citiesInput.remark,
            division_id:selectInput.division_id
        }

        axios.post(`/api/admin/cities/update`,data)
        .then((res)=>{
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

            getCities();
            

        })
    }
    return(
        <>
            <form onSubmit={updateCity} id="updatecity">
                <div className="mb-2">
                    <label>Division</label>
                    
                    <select name="division" onChange={(e)=>setSelect({...selectInput,division_id:e.target.value})} value={selectInput.division_id}   className="form-select">
                    <option>Select Division</option>
                        {divisions.map((division, index) => (
                            <option key={index} value={division.id} selected={ (division.id == city.id)?'selected':''}>
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

export default EditCity;