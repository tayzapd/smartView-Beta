import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import AddShoptypes from './AddShoptypes';
import EditShopType from './EditShopType';
import { useAdminContext } from '../../../Context/AdminContext';

const deleteShoptype = (e,id)=>{
    e.preventDefault();
    // console.log(id);
    const data = {
        id:id
    }
    axios.post(`/api/admin/shoptypes/delete/`,data)
        .then((res)=>{
            // console.log(res);
            window.location.reload(false);
        })

}


const ListShopTypes = () => {
    const {setShopType,axios} = useAdminContext();
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
                onClick={(e)=>editShow(e,row)}
            >Edit
            </button>,
        },
        {
            
            selector: (row) => 
            <button
                className='btn btn-danger'
                onClick={(e)=>deleteShoptype(e,row.id)}
            >Delete
            </button>,
        },
    
    ];

    const [shoptypes,setShoptypes] = useState([]);
    const [pending, setPending] = useState(true);
    const [show, setShow] = useState(false);

    const getShoptypes = ()=>{
        axios.post(`/api/admin/shoptypes/show`).then(res=>{
            // console.log(res);
            setShoptypes(...shoptypes,res.data);
           
        })
    }

    useEffect(()=>{
        const timeout = setTimeout(() => {
			getShoptypes();
			setPending(false);
		}, 2000);
        return () => clearTimeout(timeout);

    },[])

    // console.log(shoptypes);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showedit, setEditShow] = useState(false);
    const editClose = () => setEditShow(false);

    const editShow = (e,row) => {
        e.preventDefault();
        setEditShow(true);
        setShopType(row);
        // console.log(row);
        
    }

    return (
        <>
            <div className="container">
                <button className='btn mb-2' style={{ backgroundColor: '#fc6400' }} onClick={handleShow}>Add Shop Type</button>

            </div>
            
            <DataTable
            title="Shop Type Lists"
            columns={columns}
            data={shoptypes}
            progressPending={pending}
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
                    <AddShoptypes/>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleClose} form="addshoptype">
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
                    <EditShopType />

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={editClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" form="updateshoptype">
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
        </>
        
    )
}

export default ListShopTypes;