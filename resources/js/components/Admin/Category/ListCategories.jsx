import '../admin.css';
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAdminContext } from "../../../Context/AdminContext";
import AddCategory from "./AddCatagory";
import EditCategory from "./EditCategory";
import { Accordion } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify' ;
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const ListCategories = () => {
const {axios,setCategory,categories,setCategories} = useAdminContext();
const [show, setShow] = useState(false);
const [shops,setShops] = useState([]);
const [filterText, setFilterText] = useState('');

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const getCategories = ()=>{
axios.post(`/api/admin/categories/showAll`).then((res)=>{
setCategories(res.data);
})
}

// console.log(categories);

// const getShops = () =>{
//     axios.post(`/api/admin/shops/show`).then((res)=>{
//         // console.log(res);
//         setShops(res.data.shops);
//     })
// }


console.log(filterText);
useEffect(()=>{
    getCategories();
},[])

const [showedit, setEditShow] = useState(false);
const editClose = () => setEditShow(false);

const editShow = (e,row) => {
e.preventDefault();
setEditShow(true);
setCategory(row);
}




const deleteCategory = (e,id)=>{
const data = {
id:id
}
axios.post(`/api/admin/categories/delete`,data).then((res)=>{
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
getCategories();
})
}
const columns = [
{
name: 'ID',
selector: row => row.id,
width:"70px",
sortable: true,

},
{
name: 'Shop',
selector: row => row.shop.shop_name,
wrap:true,
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
wrap:true,
},
{
name: 'Action',
selector: (row) =>
<div>
    <button className='btn btns me-2' onClick={(e)=>editShow(e,row)}
        >Edit
    </button>

</div>,
width:'200px'


},
{
selector: (row) =>
<button className='btn btn-danger' onClick={(e)=>deleteCategory(e,row.id)}
    >Delete
</button>
}




];




return (
<>
    <div className="container ">
        <button className='btn btns' onClick={handleShow}>Add Category +</button>
        <Link to="/admin/categories/detetedrecord" className="btn ms-1 float-end btns">Trashed Bin </Link>
    </div>
    <ToastContainer />
    <Accordion className="my-3 mt-sm-5">
            
            {Object.values(categories).map((category,index) => {
                return (
                    <Accordion.Item eventKey={index}  key={index}>
                        {/* Header : Shop Name Of Items  */}
                        <Accordion.Header>
                            {category[0].shop.shop_name}
                        </Accordion.Header>

                        {/* Items Data Table  */}
                        <Accordion.Body>
                        <DataTable
                            title="Category Lists"
                            columns={columns}
                            data={category}
                            // progressPending={pending}
                            fixedHeader
                            fixedHeaderScrollHeight="300px"
                            pagination
                            responsive
                            highlightOnHover
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })}
        </Accordion>

    {/* ADD CATEGORY */}
    <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddCategory handleClose={handleClose} />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button className='btns' type="submit" form="addcategory">
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
            <EditCategory handleClose={editClose} />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={editClose}>
                Cancel
            </Button>
            <Button className='btns' type="submit" form="updatecategory">
                Update
            </Button>
        </Modal.Footer>
    </Modal>

</>
)
}

export default ListCategories;
