import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import AddShoptypes from './AddShoptypes';
import EditShopType from './EditShopType';
import { useAdminContext } from '../../../Context/AdminContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { GestureSharp } from '@material-ui/icons';
import '../admin.css';

const ListShopTypes = () => {

    const {setShopType,axios,shoptypes,setShopTypes} = useAdminContext();
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width:'70px'
    
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width:'180px'
    
        },
        {
            name: 'Remark',
            selector: row => row.remark,
            sortable:true,
            width:'200px',
            wrap:true
        },
        {
            name: 'Action',
            selector: (row) => 
            <div>
                <button
                    className='btn btns me-2'
                    onClick={(e)=>editShow(e,row)}
                >Edit
                </button>
                <button
                    className='btn btn-danger'
                    onClick={(e)=>deleteShoptype(e,row.id)}
                >Delete
                </button>
            </div>,
            width:'200px'
            
        },
        
    
    ];

    const [pending, setPending] = useState(true);
    const [show, setShow] = useState(false);
    
    const getShoptypes = async () => {
        const res = await axios.post(`/api/admin/shoptypes/show`);
        console.log(res.data);
        setShopTypes(res.data);

    }

    useEffect(()=>{
        getShoptypes();
      

    },[]);

    // console.log(shoptypes);

    const handleClose = () => {
        setShow(false)

    };
    const handleShow = () => {
        setShow(true)
    }


    const [showedit, setEditShow] = useState(false);
    const editClose = () => setEditShow(false);

    const editShow = (e,row) => {
        e.preventDefault();
        setEditShow(true);
        setShopType(row);
        // console.log(row);
        
    }

    const deleteShoptype = (e,id)=>{
        e.preventDefault();
        // console.log(id);
        const data = {
            id:id
        }
        axios.post(`/api/admin/shoptypes/delete/`,data)
            .then((res)=>{
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
                getShoptypes();
            })

        
    
    }
    return (
        <>
            
            <div className="container-fluid">
                <button className='btn btns mb-2' onClick={handleShow}>Add Shop Type</button>
                <Link to="/admin/shoptypes/detetedrecord" className="btn btns float-end mb-2">Trashed Bin</Link>

            </div>
            <ToastContainer />
            <DataTable
            title="Shop Type Lists"
            columns={columns}
            data={shoptypes}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            highlightOnHover
            
            />

            {/* Add Shop Type */}
            
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Shop Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddShoptypes handleClose={handleClose}/>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className='btns' type="submit"  form="addshoptype">
                    Save
                </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Shop Type */}
            <Modal size="lg" show={showedit} onHide={editClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Shop Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditShopType handleClose={editClose}/>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={editClose}>
                    Cancel
                </Button>
                <Button className='btns' type="submit" form="updateshoptype">
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
        </>
        
    )
}

export default ListShopTypes;