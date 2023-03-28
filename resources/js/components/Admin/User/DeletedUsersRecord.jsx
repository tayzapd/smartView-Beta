import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAdminContext } from "../../../Context/AdminContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify' ;

const DeletedUsersRecord = () => {
    const {axios} = useAdminContext();
    const [users,setUsers] = useState([]);

    const getDeleteUsers = () => {
        axios.post(`/api/admin/users/trashshow`).then((res)=>{
            // console.log(res);
            setUsers(res.data.users);
        })
    }

    useEffect(()=>{
        getDeleteUsers();
    },[])

    console.log(users);
    const restore = (e,id) =>{
        // console.log(id);
        const data = {
            id:id
        }
        axios.post(`/api/admin/users/restore`,data).then((res)=>{
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
                getDeleteUsers();
        })

    }

    const allRestore = () =>{
        axios.post(`/api/admin/users/restoreAll/`).then((res)=>{
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
                getDeleteUsers();
        })
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
    
        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
    
        },
        {
            name: 'Shop Name',
            selector: row => row.shop.shop_name,
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
                <Link to="/admin/users/" className="btn btns mb-2">All Users</Link>
                <button className="btn btns float-end mb-2" onClick={allRestore}>All Restore</button>
            </div>
            <ToastContainer/>
            <DataTable
                title="Users Deleted Lists"
                columns={columns}
                data={users}
                fixedHeader
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                highlightOnHover
            />
        </>
    )
}

export default DeletedUsersRecord;

