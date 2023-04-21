import '../admin.css';
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
                    onClick={(e)=>deleteDivision(e,row.id)}
                >Delete
                </button>
            </div>,
            width:'200px'
        }
        
    ];
    return(
        
        <>
            <div className="container-fluid">
                <button className='btn mb-2 btns' onClick={handleShow}>Add Division</button>
                <Link to="/admin/divisions/detetedrecord" className="btn btns float-end mb-2 ">Trashed Record</Link>

            </div>

            <ToastContainer/>
            <DataTable
            title="Divison Lists"
            columns={columns}
            data={divisions}
            progressPending={pending}
            fixedHeader
            fixedHeaderScrollHeight="350px"
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
                    <AddDivisions handleClose={handleClose}/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className="btns" type="submit" form="adddivision">
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
                    <EditDivision handleClose={editClose}/>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={editClose}>
                    Cancel
                </Button>
                <Button className="btns" type="submit" form="updatedivision">
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ListDivisions;