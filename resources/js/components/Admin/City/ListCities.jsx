import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddCity from './AddCity';
import { useAdminContext } from '../../../Context/AdminContext';
import EditCity from './EditCity';

axios.defaults.baseURL = "http://localhost:8000/";

const ListCities = () => {
    const {setCity} = useAdminContext();
    const [cities,setCities] = useState([]);
    const [pending, setPending] = useState(true);
    const [show, setShow] = useState(false);

    const getcities = () => {
        axios.post(`/api/admin/cities/show`).then((res)=>{
            // console.log(res);
            setCities(...cities,res.data);
        })
    }

    useEffect(()=>{
        const timeout = setTimeout(() => {
            getcities();
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
            window.location.reload(true);
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
                className='btn btn-primary'
                onClick={(e)=>editShow(e,row)}
            >Edit
            </button>,
        },
        {
            
            selector: (row) => 
            <button
                className='btn btn-danger'
                onClick={(e)=>deleteCity(e,row.id)}
            >Delete
            </button>,
        },

        
        
    ];
    return (
        <>
            <div className="container">
                <button className='btn mb-2' style={{ backgroundColor: '#fc6400' }} onClick={handleShow}>Add City</button>
            </div>

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
                    <AddCity/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" form="addcity">
                    Save
                </Button>
                </Modal.Footer>
            </Modal>

            {/* EDIT CITY */}
            <Modal size="lg" show={showedit} onHide={editClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit City</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditCity/>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={editClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" form="updatecity">
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
        </>

        
    )
    
}

export default ListCities;