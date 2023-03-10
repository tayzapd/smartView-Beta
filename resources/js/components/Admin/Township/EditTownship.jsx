import { useEffect, useState } from "react"
import { useAdminContext } from "../../../Context/AdminContext"

const EditTownship = ()=>{
    const {township,axios} = useAdminContext();
    const [cities,setCities] = useState([]);

    const [townshipsInput,setTownshipsInput] = useState({
        id:township.id,
        name:township.name,
        remark:township.remark,
    })

    const [selectInput,setSelect] = useState({
        city_id:township.city_id
    })

    useEffect(()=>{
        const getcities = ()=>{
            axios.post(`/api/admin/cities/show`).then((res)=>{
                // console.log(res);
                setCities(...cities,res.data);
            })
        }

        getcities();
    },[])

    // console.log(cities);
    const handleInput = (e)=>{
        setTownshipsInput({...townshipsInput,[e.target.name]:e.target.value});
    }

    const updateTownship = (e)=>{
        e.preventDefault();
        const data = {
            id:townshipsInput.id,
            name:townshipsInput.name,
            remark:townshipsInput.remark,
            city_id:selectInput.city_id
        }

        axios.post(`/api/admin/townships/update`,data)
        .then((res)=>{
            // console.log(res);
            setTownshipsInput({
                name:'',
                remark:''

            })

            setSelect({});
            window.location.reload(true); 
            
        })
    }

    // console.log(townshipsInput);
    // console.log(selectInput);
    return(
        <>
            <form onSubmit={updateTownship} id="updatetownship">
            <div className="mb-2">
                    <label>City</label>
                    
                    <select name="city" onChange={(e)=>setSelect({...selectInput,city_id:e.target.value})}   className="form-select">
                    <option>Select City</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city.id} selected={(city.id == selectInput.city_id)?'selected':''}>
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

export default EditTownship;
