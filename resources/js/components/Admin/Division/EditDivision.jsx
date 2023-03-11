import { useEffect, useState } from "react";
import { useAdminContext } from "../../../Context/AdminContext"

const EditDivision = () => { 
    const {division,axios} = useAdminContext();

    const [divisionInput,setDivisionInput] = useState({
        id:division.id,
        name:division.name,
        remark:division.remark 
    })
    // useEffect(() => {
    //     console.log(`Division name : ${division.name}`)
    // },[])

    const handleInput = (e)=>{
        setDivisionInput({...divisionInput,[e.target.name]:e.target.value});

    }

    const updateDivision = (e)=>{
        e.preventDefault();
        const data = {
            id:divisionInput.id,
            name:divisionInput.name,
            remark:divisionInput.remark
        }
        axios.post(`/api/admin/divisions/update`, data)
        .then(res=>{
            console.log(res);

            setDivisionInput({
                name:'',
                remark:''
            })

            window.location.reload(false);  
        })
    }
    return(
        <>
            <form onSubmit={updateDivision} id="updatedivision">
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={divisionInput.name} className="form-control" required/>

                </div>
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={divisionInput.remark} className="form-control" required/>
                </div>
            </form>
        </>
    )
}

export default EditDivision;