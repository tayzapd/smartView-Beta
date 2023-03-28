import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify' ;
import { useAdminContext } from "../../Context/AdminContext";

const DeletedItemsRecord = () => {
    const {axios} = useAdminContext();
    const [items,setItems] = useState([]);

    const getDeleteItems = () => {
        axios.post(`/api/admin/items/trashshow`).then((res)=>{
            // console.log(res);
            setItems(res.data.items);
        })
    }

    useEffect(()=>{
        getDeleteItems();
    },[])

    console.log(items);
    const restore = (e,id) =>{
        // console.log(id);
        const data = {
            id:id
        }
        axios.post(`/api/admin/items/restore`,data).then((res)=>{
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
                getDeleteItems();
        })

    }

    const allRestore = () =>{
        axios.post(`/api/admin/items/restoreAll/`).then((res)=>{
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
                getDeleteItems();
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
            name: 'Category Name',
            selector: row => row.category.name,
        },
        {
            name: 'Taste',
            selector: row => row.taste,
        },
        {
            name: 'Privacy',
            selector: row => row.privacy,
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
                <Link to="/admin/items/" className="btn btns mb-2">All Items</Link>
                <button className="btn btns float-end mb-2" onClick={allRestore}>All Restore</button>
            </div>
            <ToastContainer/>
            <DataTable
                title="Items Deleted Lists"
                columns={columns}
                data={items}
                fixedHeader
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                highlightOnHover
            />
        </>
    )
}

export default DeletedItemsRecord;

