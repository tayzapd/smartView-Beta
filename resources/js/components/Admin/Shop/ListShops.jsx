import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddShop from "./AddShop";
import { useAdminContext } from "../../../Context/AdminContext";
import EditShop from "./EditShop";

const ListShops = ()=>{
    const {axios,setShop} = useAdminContext();
    const [shops,setShops] = useState([]);
    const [show, setShow] = useState(false);
    
    const getshops = () => {
        axios.post(`/api/admin/shops/show`).then((res)=>{
            // console.log(res.data.shops);
            setShops(...shops,res.data.shops);
        })
    }

    useEffect(()=>{
        getshops();
    },[])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showedit, setEditShow] = useState(false);
    const editClose = () => setEditShow(false);

    const editShow = (e,row) => {
        e.preventDefault();
        setEditShow(true);
        setShop(row);
        // console.log(row);
        
    }

    const deleteShop = (e,id)=>{
        e.preventDefault();
        // console.log(id);
        const data = {
            id:id
        }

        axios.post(`/api/admin/shops/delete/`,data).then((res)=>{
            console.log(res);
            window.location.reload(true);
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
                onClick={(e)=>editShow(e,row)}
            >Edit
            </button>,
        },
        {
            
            selector: (row) => 
            <button
                className='btn btn-danger'
                onClick={(e)=>deleteShop(e,row.id)}
            >Delete
            </button>,
        },  
    ];

    
    return (
        <>
            <div className="container">
                <button className='btn mb-2' style={{ backgroundColor: '#fc6400' }} onClick={handleShow}>Add Shop</button>
            </div>

            <DataTable
            title="Shop Lists"
            columns={columns}
            data={shops}
            // progressPending={pending}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            highlightOnHover
            />

            {/* ADD SHOP */}

            <Modal size="lg" show={show} onHide={handleClose} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Shop</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddShop/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" form="addshop">
                    Save
                </Button>
                </Modal.Footer>
            </Modal>

            {/* EDIT SHOP */}

            <Modal size="lg" show={showedit} onHide={editClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Shop</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditShop/>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={editClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" form="updateshop">
                    Update
                </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default ListShops;