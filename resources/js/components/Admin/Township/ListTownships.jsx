import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

axios.defaults.baseURL = "http://localhost:8000/";

const ListTownships = () => {
    const [townships,setTownships] = useState([]);

    const getTownships = ()=>{
        axios.post(`/api/admin/townships/show`).then((res)=>{
            // console.log(res);
            setTownships(...townships,res.data);
        })
    }

    useEffect(()=>{
        getTownships();
    },[])

    // console.log(townships);
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
    
        },
        {
            name: 'City',
            selector: row => row.city_id,
            sortable: true,
    
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Remark',
            selector: row => row.remark,
        },
        // {
            
        //     selector: (row) => 
        //     <button
        //         className='btn btn-primary'
        //         onClick={(e)=>editShow(e,row)}
        //     >Edit
        //     </button>,
        // },
        // {
            
        //     selector: (row) => 
        //     <button
        //         className='btn btn-danger'
        //         onClick={(e)=>deleteCity(e,row.id)}
        //     >Delete
        //     </button>,
        // },

        
        
    ];

    return (
        <>
            <div className="container">
                <button className='btn mb-2' style={{ backgroundColor: '#fc6400' }} onClick={handleShow}>Add City</button>
            </div>
            <DataTable
            title="Township Lists"
            columns={columns}
            data={townships}
            // progressPending={pending}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            highlightOnHover
            />
        </>
    )
}

export default ListTownships;