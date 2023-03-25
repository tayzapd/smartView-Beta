import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import AddDivisions from "./AddDivisions";
import { useAdminContext } from "../../../Context/AdminContext";
import EditDivision from "./EditDivision";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const ListDivisions = () => {
    const {setDivision,axios,divisions,setDivisions} = useAdminContext();
    const [pending, setPending] = useState(true);
    const [show, setShow] = useState(false);


    // SHOW
    const getDivisions = ()=>{
        axios.post(`/api/admin/divisions/show`).then(res=>{
            
            // console.log(res);
            setDivisions(res.data);
           
        })
    }
    // console.log(divisions);
    useEffect(()=>{
        const timeout = setTimeout(() => {
            getDivisions();
			setPending(false);
		}, 2000);
        return () => clearTimeout(timeout);
    },[]);

    // DELETE
    const deleteDivision = (e,id) => {
        e.preventDefault();
        // console.log(id);
        const data = {
            id:id
        }

        axios.post(`/api/admin/divisions/delete/`,data).then((res)=>{
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
            getDivisions();
            
        })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEdit, setEditShow] = useState(false);
    const editClose = () => setEditShow(false);

    const editShow = (e,row) => {
        e.preventDefault();
        setEditShow(true);
        setDivision(row);
        // console.log(row);  
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
                onClick={(e)=>deleteDivision(e,row.id)}
            >Delete
            </button>,
        },
        
    ];
    return(
        
        <>
            <div className="container">
                <button className='btn mb-2' style={{ backgroundColor: '#fc6400' }} onClick={handleShow}>Add Division</button>
                <Link to="/admin/divisions/detetedrecord" style={{ backgroundColor: '#fc6400' , borderColor:'#fc6400' }} className="btn btn-primary float-end mb-2 text-dark">Deleted Record</Link>

            </div>

            <ToastContainer/>
            <DataTable
            title="Divison Lists"
            columns={columns}
            data={divisions}
            progressPending={pending}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            highlightOnHover
            />
            
            {/* ADD DIVISION */}
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Division</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddDivisions/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose} type="submit" form="adddivision">
                    Save
                </Button>
                </Modal.Footer>
            </Modal>

            {/* EDIT DIVISION */}

            <Modal size="lg" show={showEdit} onHide={editClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Division</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditDivision />

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={editClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={editClose} type="submit" form="updatedivision">
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ListDivisions;