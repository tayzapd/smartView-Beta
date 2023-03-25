import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAdminContext } from "../../../Context/AdminContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify' ;

const DeletedShopsRecord = () => {
    const {axios} = useAdminContext();
    const [shops,setShops] = useState([]);

    const getDeleteShops = () => {
        axios.post(`/api/admin/shops/trashshow`).then((res)=>{
            // console.log(res);
            setShops(res.data.shops);
        })
    }

    useEffect(()=>{
        getDeleteShops();
    },[])

    // console.log(shops);
    const restore = (e,id) =>{
        // console.log(id);
        const data = {
            id:id
        }
        axios.post(`/api/admin/shops/restore`,data).then((res)=>{
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
                getDeleteShops();
        })

    }

    const allRestore = () =>{
        axios.post(`/api/admin/shops/restoreAll/`).then((res)=>{
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
                getDeleteShops();
        })
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
    
        },
        {   
            name: 'Logo Image',
            selector: (row) => 
            <img src={window.location.origin+"/shoplogo/"+ row.logo_image} width={70} alt="shoplogo"/>,
            
        
        },
        {
            name: 'Shop Type',
            selector: row => row.shoptype.name,
            width:"200px",
            sortable: true,
    
        },
        {
            name: 'Township',
            selector: row => row.township.name,
            width:"200px",
            wrap:true
        },
        {
            name: 'Shop Name',
            selector: row => row.shop_name,
        },
        {
            name: 'Address',
            selector: row => row.address,
            width:"200px",
            wrap:true
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            width:"200px",
        },
        {
            name: 'Expired Date',
            selector: row => row.expired_date,
            width:"200px",

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
                <Link to="/admin/shops/" style={{ backgroundColor: '#fc6400', borderColor:'#fc6400' }} className="btn btn-primary mb-2 text-dark">All Shops</Link>
                <button className="btn btn-success float-end mb-2 text-dark" style={{ backgroundColor: '#fc6400', borderColor:'#fc6400' }} onClick={allRestore}>All Restore</button>
            </div>
            <ToastContainer/>
            <DataTable
                title="Shop Deleted Lists"
                columns={columns}
                data={shops}
                fixedHeader
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                highlightOnHover
            />
        </>
    )
}

export default DeletedShopsRecord;

