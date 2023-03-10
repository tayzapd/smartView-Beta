import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import AddDivisions from "./AddDivisions";
import { useAdminContext } from "../../../Context/AdminContext";
import EditDivision from "./EditDivision";



const ListDivisions = () => {
    const {setDivision,axios} = useAdminContext();
    const [divisions,setDivisions] = useState([]);
    const [pending, setPending] = useState(true);
    const [show, setShow] = useState(false);


    // SHOW
    const getDivisions = ()=>{
        axios.post(`/api/admin/divisions/show/`).then(res=>{
            
            // console.log(res);
            setDivisions(...divisions,res.data);
           
        })
    }

    useEffect(()=>{
        const timeout = setTimeout(() => {
            getDivisions();
			setPending(false);
		}, 2000);
        return () => clearTimeout(timeout);
    },[]);

    // DELETE
    const deleteShoptype = (e,id) => {
        e.preventDefault();
        // console.log(id);
        const data = {
            id:id
        }

        axios.post(`/api/admin/divisions/delete/`,data).then((res)=>{
            console.log(res);
            window.location.reload(true);
        })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showedit, setEditShow] = useState(false);
    const editClose = () => setEditShow(false);

    const editShow = (e,row) => {
        e.preventDefault();
        setEditShow(true);
        setDivision(row);
        console.log(row);  
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
                onClick={(e)=>deleteShoptype(e,row.id)}
            >Delete
            </button>,
        },
        
    ];
    return(
        
        <>
            <div className="container">
                <button className='btn mb-2' style={{ backgroundColor: '#fc6400' }} onClick={handleShow}>Add Division</button>
            </div>

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
                <Button variant="primary" type="submit" form="adddivision">
                    Save
                </Button>
                </Modal.Footer>
            </Modal>

            {/* EDIT DIVISION */}

            <Modal size="lg" show={showedit} onHide={editClose}>
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
                <Button variant="primary" type="submit" form="updatedivision">
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ListDivisions;