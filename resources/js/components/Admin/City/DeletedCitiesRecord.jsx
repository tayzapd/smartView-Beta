import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAdminContext } from "../../../Context/AdminContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify' ;

const DeletedCitiesRecord = () => {
    const {axios} = useAdminContext();
    const [cities,setCities] = useState([]);

    const getDeleteCities = () => {
        axios.post(`/api/admin/cities/trashshow`).then((res)=>{
            // console.log(res);
            setCities(res.data.cities);
        })
    }

    useEffect(()=>{
        getDeleteCities();
    },[])

    // console.log(cities);
    const restore = (e,id) =>{
        console.log(id);
        const data = {
            id:id
        }
        axios.post(`/api/admin/cities/restore`,data).then((res)=>{
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
                getDeleteCities();
        })

    }

    const allRestore = () =>{
        axios.post(`/api/admin/cities/restoreAll/`).then((res)=>{
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
                getDeleteCities();
        })
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
    
        },
        {
            name: 'Division',
            selector: row => row.division.name,
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
                <Link to="/admin/cities/" className="btn btns mb-2">All Cities</Link>
                <button className="btn btns float-end mb-2" style={{ backgroundColor: '#fc6400', borderColor:'#fc6400' }} onClick={allRestore}>All Restore</button>
            </div>
            <ToastContainer/>
            <DataTable
                title="City Deleted Lists"
                columns={columns}
                data={cities}
                fixedHeader
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                highlightOnHover
            />
        </>
    )
}

export default DeletedCitiesRecord;

