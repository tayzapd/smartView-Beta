import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAdminContext } from "../../../Context/AdminContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify' ;

const DeletedDivisionsRecord = () => {
    const {axios} = useAdminContext();
    const [divisions,setDivisions] = useState([]);

    const getDeleteDivisions = () => {
        axios.post(`/api/admin/divisions/trashshow`).then((res)=>{
            // console.log(res);
            setDivisions(res.data.divisions);
        })
    }

    useEffect(()=>{
        getDeleteDivisions();
    },[])

    // console.log(divisions);
    const restore = (e,id) =>{
        console.log(id);
        const data = {
            id:id
        }
        axios.post(`/api/admin/divisions/restore`,data).then((res)=>{
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
                getDeleteDivisions();
        })

    }

    const allRestore = () =>{
        axios.post(`/api/admin/divisions/restoreAll/`).then((res)=>{
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
                getDeleteDivisions();
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
                <Link to="/admin/divisions/" style={{ backgroundColor: '#fc6400', borderColor:'#fc6400' }} className="btn btn-primary mb-2 text-dark">All Divisions</Link>
                <button className="btn btn-success float-end mb-2 text-dark" style={{ backgroundColor: '#fc6400', borderColor:'#fc6400' }} onClick={allRestore}>All Restore</button>
            </div>
            <ToastContainer/>
            <DataTable
                title="Division Deleted Lists"
                columns={columns}
                data={divisions}
                fixedHeader
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                highlightOnHover
            />
        </>
    )
}

export default DeletedDivisionsRecord;

