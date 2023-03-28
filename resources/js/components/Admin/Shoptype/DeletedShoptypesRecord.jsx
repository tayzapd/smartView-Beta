import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAdminContext } from "../../../Context/AdminContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify' ;

const DeletedShoptypesRecord = () => {
    const {axios} = useAdminContext();
    const [shoptypes,setShoptypes] = useState([]);

    const getDeleteShoptypes = () => {
        axios.post(`/api/admin/shoptypes/trashshow`).then((res)=>{
            // console.log(res);
            setShoptypes(res.data.shoptypes);
        })
    }

    useEffect(()=>{
        getDeleteShoptypes();
    },[])

    // console.log(shoptypes);
    const restore = (e,id) =>{
        // console.log(id);
        const data = {
            id:id
        }
        axios.post(`/api/admin/shoptypes/restore`,data).then((res)=>{
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
                getDeleteShoptypes();
        })

    }

    const allRestore = () =>{
        axios.post(`/api/admin/shoptypes/restoreAll/`).then((res)=>{
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
                getDeleteShoptypes();
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
                className='btn btns'
                onClick={(e)=>restore(e,row.id)}
            >Restore
            </button>,
        }, 
        
    
    ];


    return (
        <>
            <div className="container">
                <Link to="/admin/shoptypes/" className="btn btns mb-2">All Shoptypes</Link>
                <button className="btn btns float-end mb-2" onClick={allRestore}>All Restore</button>
            </div>
            <ToastContainer/>
            <DataTable
                title="Shop Deleted Lists"
                columns={columns}
                data={shoptypes}
                fixedHeader
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                highlightOnHover
            />
        </>
    )
}

export default DeletedShoptypesRecord;

