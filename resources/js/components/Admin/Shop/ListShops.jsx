import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddShop from "./AddShop";
import { useAdminContext } from "../../../Context/AdminContext";

const ListShops = ()=>{
    const {axios} = useAdminContext();
    const [shops,setShops] = useState([]);
    const [show, setShow] = useState(false);
    
    const getshops = () => {
        axios.post(`/api/admin/shops/show`).then((res)=>{
            console.log(res.data.shops);
            setShops(...shops,res.data.shops);
        })
    }

    useEffect(()=>{
        getshops();
    },[])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
    
        },
        {
            name: 'Shop Type',
            selector: row => row.shoptype_id,
            sortable: true,
    
        },
        {
            name: 'Township',
            selector: row => row.township_id,
        },
        {
            name: 'Shop Name',
            selector: row => row.shop_name,
        },
        {
            name: 'Address',
            selector: row => row.address,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
        },
        {
            name: 'Logo Image',
            selector: row => row.logo_image,
        },
        {
            name: 'Expired Date',
            selector: row => row.expired_date,
        },
        // {
            
        //     selector: (row) => 
        //     <button
        //         className='btn btn-primary'
        //         onClick={(e)=>editShow(e,row)}
        //     >Edit
        //     </button>,
        // },
        // {
            
        //     selector: (row) => 
        //     <button
        //         className='btn btn-danger'
        //         onClick={(e)=>deleteTownship(e,row.id)}
        //     >Delete
        //     </button>,
        // },  
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
                    <Modal.Title>Add Township</Modal.Title>
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

        </>
    )
}

export default ListShops;