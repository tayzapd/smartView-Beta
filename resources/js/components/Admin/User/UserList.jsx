import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useAdminContext }  from '../../../Context/AdminContext';
import { Edit,Delete } from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import '../admin.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [shops, setShops] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const {axios} = useAdminContext();
  const [user, setUser] = useState({
    shop_id:'',
    username: '',
    password: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const getUsers = async () => {
    const res = await axios.post('/api/admin/users/show');
    setUsers(res.data.users);
  };
  // console.log(users);
  const addUser = async (e) => {
    e.preventDefault();
    await axios.post('/api/admin/users/create', user).then((res)=>{
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
        handleClose();
        getUsers();
    });
    
  };

  const editUser = async (e) => {
    e.preventDefault();
    await axios.post('/api/admin/users/update',user).then((res)=>{
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
        setShowEdit(false);
        getUsers();
    })
    
    
  }

  const deleteUser = async (id) => {
    await axios.post('/api/admin/users/delete',{id:id}).then((res)=>{
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
        getUsers(); 
    }) 
  }


  const getShops = async () => {
        const {data} = await axios.post(`/api/admin/shops/show`);
        setShops(data.shops);
    }

  useEffect(() => {
    getShops();
    getUsers();
  }, []);

  console.log(users);
  const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,

    },
    {
        name: 'Username',
        selector: row => row.username,
        sortable: true,

    },
    {
        name: 'Shop Name',
        selector: row => row.shop.shop_name,
    },
    {      
      selector: (row) => 
      <Button onClick={() => {
        setShowEdit(true);
        setUser(user);

      }} size='sm' className="me-2 btns">
          <Edit/>
      </Button>
    },
    {      
      selector: (row) => 
      <Button onClick={() => {deleteUser(row.id)}} size='sm' className="" variant="danger">
          <Delete />
      </Button>
    },
    
    

];
  return (
    <div className='container'>
      <Button className='my-3 btns' onClick={handleShow}>
        Add User +
      </Button>
      <Link to="/admin/users/detetedrecord" className="btn btns float-end mb-2">Deleted Record</Link>

      <ToastContainer/>
     

      <DataTable
        title="Users Lists"
        columns={columns}
        data={users}
        fixedHeader
        fixedHeaderScrollHeight="300px"
        pagination
        responsive
        highlightOnHover
    />
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addUser}>
            <Form.Group>
                <Form.Label>Shop</Form.Label>
                <Form.Select required name="shop_id" onChange={(e) => { user.shop_id = e.target.value }} aria-label="Shop Name" className="mb-3">
                    {shops.map((shop,index) => {
                        return (
                            <option key={index} value={shop.id}>{shop.shop_name} </option>
                        )
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button className='btns' type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
       
      </Modal>

      <Modal show={showEdit} onHide={() => {setShowEdit(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User <Edit />  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
                <Form.Label>Shop</Form.Label>
                <Form.Select name="shop_id" onChange={(e) => { user.shop_id = e.target.value }} aria-label="Shop Name" className="mb-3">
                    {shops.map((shop,index) => {
                        return (
                            <option key={index} value={shop.id}>{shop.shop_name} </option>
                        )
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShowEdit(false)} }>
            Cancel
          </Button>
          <Button className='btns' onClick={editUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;