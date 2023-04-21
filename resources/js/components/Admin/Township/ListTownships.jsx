import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddTownship from "./AddTownship";
import { useAdminContext } from "../../../Context/AdminContext";
import EditTownship from "./EditTownship";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import '../admin.css';

const ListTownships = () => {
    const {axios,setTownship,townships,setTownships,dialog,setDialog} = useAdminContext();
    const [show, setShow] = useState(false);
    const [pending, setPending] = useState(true);


    const getTownships = async ()=>{
        const res = await axios.post(`/api/admin/townships/show`).then((res)=>{
            // console.log(res.data);
            setTownships(res.data);
        })
    }

    useEffect(()=>{
        
        const timeout = setTimeout(() => {
            getTownships();
			setPending(false);
		}, 1000);
        return () => clearTimeout(timeout);
        
    },[])

    console.log(townships);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteTownship = (e,id)=>{
        e.preventDefault();
        const data = {
            id:id
        }

        axios.post(`/api/admin/townships/delete/`,data).then((res)=>{
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
            getTownships();
        })
    }

    const [showedit, setEditShow] = useState(false);
    const editClose = () => setEditShow(false);

    const editShow = (e,row) => {
        e.preventDefault();
        setEditShow(true);
        setTownship(row);
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
            name: 'City',
            selector: row => row.city.name,
            sortable: true,
            width:'150px'
    
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable:true,
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
                    onClick={(e)=>deleteTownship(e,row.id)}
                >Delete
                </button>
            </div>
        }

        
        
    ];

    return (
        <>
            <div className="container">
                <button className='btn btns mb-2' onClick={handleShow}>Add Township</button>
                <Link to="/admin/townships/detetedrecord" className="btn btns float-end mb-2">Trashed Bin</Link>

            </div>
            <ToastContainer/>
            <DataTable
            title="Township Lists"
            columns={columns}
            data={townships}
            progressPending={pending}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            highlightOnHover
            />

            {/* ADD TOWNSHIP */}
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Township</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddTownship handleClose={handleClose}/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className="btns" type="submit" form="addtownship">
                    Save
                </Button>
                </Modal.Footer>
            </Modal>

            {/* EDIT TOWNSHIP */}
            <Modal size="lg" show={showedit} onHide={editClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Township</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditTownship handleClose={editClose}/>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={editClose}>
                    Cancel
                </Button>
                <Button className="btns" type="submit" form="updatetownship">
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ListTownships;