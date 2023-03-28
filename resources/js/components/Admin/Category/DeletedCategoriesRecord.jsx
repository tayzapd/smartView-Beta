import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAdminContext } from "../../../Context/AdminContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify' ;

const DeletedCategoriesRecord = () => {
    const {axios} = useAdminContext();
    const [categories,setCategories] = useState([]);

    const getDeleteShoptypes = () => {
        axios.post(`/api/admin/categories/trashshow`).then((res)=>{
            // console.log(res);
            setCategories(res.data.categories);
        })
    }

    useEffect(()=>{
        getDeleteShoptypes();
    },[])

    // console.log(categories);
    const restore = (e,id) =>{
        // console.log(id);
        const data = {
            id:id
        }
        axios.post(`/api/admin/categories/restore`,data).then((res)=>{
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
        axios.post(`/api/admin/categories/restoreAll/`).then((res)=>{
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
            width:"60px",
            sortable: true,
    
        },
        {
            name: 'Shop',
            selector: row => row.shop.shop_name,
            width:"200px",
            wrap:true,
            sortable: true,
    
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Remark',
            selector: row => row.remark,
            width:"200px",
            wrap:true,
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
            <Link to="/admin/categories/" className="btn btn-primary mb-2">All Categories</Link>
            <button className="btn btn-success float-end mb-2" style={{ backgroundColor: '#fc6400' }} onClick={allRestore}>All Restore</button>
        </div>
        <ToastContainer/>
        <DataTable
                title="Category Deleted Lists"
                columns={columns}
                data={categories}
                fixedHeader
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                highlightOnHover
            />
        </>
    )
}

export default DeletedCategoriesRecord;

