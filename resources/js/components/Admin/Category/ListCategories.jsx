import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAdminContext } from "../../../Context/AdminContext";
import AddCategory from "./AddCatagory";
import EditCategory from "./EditCategory";

const ListCategories = () => {
    const {axios,setCategory} = useAdminContext();
    const [categories,setCategories] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getCategories = ()=>{
        axios.post(`/api/admin/categories/showAll`).then((res)=>{
            // console.log(res);
            setCategories(...categories,res.data);
        })
    }
    useEffect(()=>{
        getCategories();
    },[])

    // console.log(categories);

    const [showedit, setEditShow] = useState(false);
    const editClose = () => setEditShow(false);

    const editShow = (e,row) => {
        e.preventDefault();
        setEditShow(true);
        setCategory(row);
        getCategories()
    }

    const deleteCategory = (e,id)=>{
        const data = {
            id:id
        }
        axios.post(`/api/admin/categories/delete`,data).then((res)=>{
            // console.log(res);
            getCategories();
        })
    }
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
    
        },
        {
            name: 'Shop',
            selector: row => row.shop.shop_name,
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
                onClick={(e)=>deleteCategory(e,row.id)}
            >Delete
            </button>,
        },

        
        
    ];

    return (
        <>
            <div className="container">
                <button className='btn mb-2' style={{ backgroundColor: '#fc6400' }} onClick={handleShow}>Add Category</button>
            </div>

            <DataTable
            title="Category Lists"
            columns={columns}
            data={categories}
            // progressPending={pending}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            highlightOnHover
            />

            {/* ADD CATEGORY */}
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddCategory/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" form="addcategory">
                    Save
                </Button>
                </Modal.Footer>
            </Modal>

            {/* EDIT CATEGORY */}

            <Modal size="lg" show={showedit} onHide={editClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditCategory/>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={editClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" form="updatecategory">
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ListCategories;