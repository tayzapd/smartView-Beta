import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAdminContext } from "../../../Context/AdminContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify' ;

const DeletedTownshipsRecord = () => {
    const {axios} = useAdminContext();
    const [townships,setTownships] = useState([]);

    const getDeleteTownships = () => {
        axios.post(`/api/admin/townships/trashshow`).then((res)=>{
            // console.log(res);
            setTownships(res.data.townships);
        })
    }

    useEffect(()=>{
        getDeleteTownships();
    },[])

    // console.log(townships);
    const restore = (e,id) =>{
        // console.log(id);
        const data = {
            id:id
        }
        axios.post(`/api/admin/townships/restore`,data).then((res)=>{
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
                getDeleteTownships();
        })

    }

    const allRestore = () =>{
        axios.post(`/api/admin/townships/restoreAll/`).then((res)=>{
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
                getDeleteTownships();
        })
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
    
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
    
        },
        {
            name: 'Remark',
            selector: row => row.remark,
        },
        {
            selector: (row) => 
            <button
                className='btn btn-primary'
                onClick={(e)=>restore(e,row.id)}
            >Restore
            </button>,
        }, 
        
    
    ];


    return (
        <>
            <div className="container">
                <Link to="/admin/townships/" style={{ backgroundColor: '#fc6400', borderColor:'#fc6400' }} className="btn btn-primary mb-2 text-dark">All Townships</Link>
                <button className="btn btn-success float-end mb-2 text-dark" style={{ backgroundColor: '#fc6400', borderColor:'#fc6400' }} onClick={allRestore}>All Restore</button>
            </div>
            <ToastContainer/>
            <DataTable
                title="Shop Deleted Lists"
                columns={columns}
                data={townships}
                fixedHeader
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                highlightOnHover
            />
        </>
    )
}

export default DeletedTownshipsRecord;

