import '../admin.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddCity from './AddCity';
import { useAdminContext } from '../../../Context/AdminContext';
import EditCity from './EditCity';
import { toast, ToastContainer } from 'react-toastify' ;
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';


const ListCities = () => {
    const {setCity,axios,cities,setCities} = useAdminContext();
    const [pending, setPending] = useState(true);
    const [show, setShow] = useState(false);

    const getCities = () => {
        axios.post(`/api/admin/cities/show`).then((res)=>{
            console.log(res);
            setCities(res.data);
        })
    }

    useEffect(()=>{
        const timeout = setTimeout(() => {
            getCities();
			setPending(false);
		}, 1000);
        return () => clearTimeout(timeout);
        
    },[]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteCity = (e,id)=>{
        e.preventDefault();
        // console.log(id);
        const data = {
            id:id
        }

        axios.post(`/api/admin/cities/delete/`,data).then((res)=>{
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
            getCities();
        })
    }

    const [showedit, setEditShow] = useState(false);
    const editClose = () => setEditShow(false);

    const editShow = (e,row) => {
        e.preventDefault();
        setEditShow(true);
        setCity(row);
        // console.log(row);  
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width:'70px'
    
        },
        {
            name: 'Division',
            selector: row => row.division.name,
            sortable: true,
            width:'150px'
    
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width:'150px',
            
        },
        {
            name: 'Remark',
            selector: row => row.remark,
            sortable: true,
            width:'200px',
            wrap:true,
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
                    onClick={(e)=>deleteCity(e,row.id)}
                >Delete
                </button>
            </div>,
            width:'200px'
        },
        

        
        
    ];
    return (
        <>
            <div className="container-fluid">
                <button className='btn mb-2 btns'  onClick={handleShow}>Add City</button>
                <Link to="/admin/cities/detetedrecord" className="btn float-end mb-2 btns">Trashed Bin</Link>

            </div>

            <ToastContainer/>
            <DataTable
            title="City Lists"
            columns={columns}
            data={cities}
            progressPending={pending}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            highlightOnHover
            />

            {/* ADD CITY */}
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add City</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddCity handleClose={handleClose}/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className='btns' type="submit" form="addcity">
                    Save
                </Button>
                </Modal.Footer>
            </Modal>

            {/* EDIT CITY */}
            <Modal size="lg" show={showedit} onHide={() => {setEditShow(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit City</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditCity handleClose={editClose}/>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {setEditShow(false) }}>
                    Cancel
                </Button>
                <Button className='btns' type="submit" form="updatecity">
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
        </>

        
    )
    
}

export default ListCities;