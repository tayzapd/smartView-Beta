import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useAdminContext }  from '../../../Context/AdminContext';
import { Edit,Delete } from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import '../admin.css';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const {axios} = useAdminContext();
  const [admin, setAdmin] = useState({
    username: '',
    password: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const getAdmins = async () => {
    const res = await axios.post('/api/admin/admins/show');
    setAdmins(res.data.admins);
  };
  const addAdmin = async (e) => {
    e.preventDefault();
    await axios.post('/api/admin/admins/create', admin).then((res)=>{
      setAdmin({username:'',password:''});
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
        handleClose();
        getAdmins();
    });
    
  };

  const editAdmin = async (e) => {
    e.preventDefault();
    await axios.post('/api/admin/admins/update',admin).then((res)=>{
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
        setShowEdit(false);
        getAdmins();
    })
    
    
  }

  const deleteAdmin = async (id) => {
    await axios.post('/api/admin/admins/delete',{id:id}).then((res)=>{
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
        getAdmins(); 
    }) 
  }




  useEffect(() => {
    getAdmins();
  }, []);

  const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
        width:'100px',

    },
    {
        name: 'Username',
        selector: row => row.username,
        sortable: true,
        width:'200px'

    },

    {     
      name:"Action", 
      selector: (row) => 
      <div>
        <Button onClick={() => {
          setShowEdit(true);
          setAdmin(row);

        }} size='sm' className="me-2 btns">
            <Edit/>
        </Button>
        <Button onClick={() => {deleteAdmin(row.id)}} size='sm' className="" variant="danger">
            <Delete />
        </Button>
      </div>
    },
];
  return (
    <div className='container'>
      <Button className='my-3 btns' onClick={handleShow}>
        Add Admin +
      </Button>
      <Link to="/admin/admins/detetedrecord" className="btn btns float-end mb-2">Trashed Record</Link>

      <ToastContainer/>
 

      <DataTable
        title="Admins Lists"
        columns={columns}
        data={admins}
        fixedHeader
        fixedHeaderScrollHeight="300px"
        pagination
        responsive
        highlightOnHover
    />
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addAdmin}>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                name="username"
                value={admin.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit' >
              Save Changes
            </Button>
          </Modal.Footer>
          </Form>
        </Modal.Body>
        
      </Modal>

      <Modal show={showEdit} onHide={() => {setShowEdit(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Admin <Edit />  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editAdmin}>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={admin.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => {setShowEdit(false)} }>
                Close
              </Button>
              <Button variant="primary" type='submit'>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
        
      </Modal>
    </div>
  );
};

export default AdminList;