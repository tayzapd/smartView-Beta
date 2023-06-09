import { useEffect,useState } from "react";
import { useAdminContext } from "../../Context/AdminContext";
import { 
    Accordion,Form,Modal,
    Button,
 } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from 'react-toastify' ;
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import './admin.css';

const Items = () => {
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
            width:'150px'
    
        },
        {
            name: 'Category Name',
            selector: row => row.category.name,
            sortable:true,
            width:'200px'
        },
        {
            name: 'tag',
            selector: row => row.tag,
            sortable:true,
            width:'200px',
            wrap:true
        },
        {
            name: 'Privacy',
            selector: row => row.privacy,
            sortable:true,
            width:'150px',
            warp:true
        },
        {
            name:"Edit",
            selector: (row) => 
            <button
                className='btn btns'
                onClick={(e)=> {
                    row.special_range = row.special_range.substring(0,10);
                    setItem(row);
                    item.category_id = row.category.id;
                    item.shop_id = row.category.shop_id;
                    item.images = [];
                    item.is_available = row.is_available == 1 ? true : false; 
                    getCategories(row.category.shop_id);
                    
                    setEdit(true);
                    
                }}
            >
                Edit
            </button>,
        },
        {
            name:"Delete",
            selector: (row) => 
            <button
                className='btn btn-danger'
                onClick={(e)=>deleteItem(row.id)}
            >Delete
            </button>,
        },

        
        
    ];
    const {axios} = useAdminContext();
    const [shops,setShops] = useState([]);
    const [shopList,setShopList] = useState([]);
    const [create,setCreate] = useState(false);
    const [edit,setEdit] = useState(false);
    const [fileList,setFileList] = useState([]);
    const [categories,setCategories] = useState([]);
    const [item,setItem] = useState({
        shop_id:'',
        name:'',
        category_id:'',
        category:{shop:{id:0}},
        description:'',
        remark:'',
        images:[],
        price:'',
        special_date:'',
        is_available:true,
        privacy:'public',
    }); 


    

    const createItem = () => {
        const formData = new FormData();
        fileList.forEach(img => {
            formData.append('images[]',img)
        })
 
        formData.append('name',item.name);
        formData.append('shop_id',item.shop_id);
        formData.append('price',item.price);
        formData.append('description',item.description);
        formData.append('remark',item.remark);
        formData.append('tag',item.tag);
        formData.append('special_range',item.special_date);
        formData.append('privacy',item.privacy);
        formData.append('is_available',item.is_available);
        formData.append('category_id',item.category_id);

        
        try {
            axios.post('/api/admin/items/create', formData).then((res)=>{
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
                    getItems();
            });
        } catch (err) {
            console.log(err); // handle error response from server
        }
    };

    const editItem = async  () => {

        // if file data is empty we don't need to add images 
        if(fileList.length != 0){
            const formData = new FormData();
            fileList.forEach(img => {
                formData.append('images[]',img)
            });
            formData.append('id',item.id);
            formData.append('name',item.name);
            formData.append('shop_id',item.shop_id);
            formData.append('price',item.price);
            formData.append('description',item.description);
            formData.append('remark',item.remark);
            formData.append('tag',item.tag);
            formData.append('special_range',item.special_date);
            formData.append('privacy',item.privacy);
            formData.append('is_available',item.is_available);
            formData.append('category_id',item.category_id);
            const {data} = axios.post(`/api/admin/items/update/`,formData);
            toast.success("Item Updated Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            getItems();

            
            
        }
        else {
            let formData = {
                id:item.id,
                name:item.name,
                shop_id:item.shop_id,
                price:item.price,
                description:item.description,
                remark:item.remark,
                tag:item.tag,
                special_range:item.special_date,
                privacy:item.privacy,
                is_available:item.is_available,
                category_id:item.category_id,
            };

            const { data }  = axios.post(`/api/admin/items/update`,formData);
            toast.success("Item Updated Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            getItems();


        }     

        
        
    }

    const deleteItem =  async (id)  => {
        const { data } = axios.post('/api/admin/items/delete',{id:id});
        toast.success("Item Updated Successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        getItems();


    }

    const handleChange = (e) => {

        for (let i = 0; i < e.target.files.length; i++) {
            setFileList([...fileList,e.target.files[i]])
        }

        item.images = e.target.files;
        // console.log(item.images)
        // console.log(e.target.files);
        // console.log(fileList)

    };

    const getShops = async  () => {
        const { data } = await axios.post(`/api/admin/shops/show`); 
        // console.log(data);
        setShopList(data.shops);
    }

    const getCategories = async (shop_id) => {
        const { data } = await axios.post('/api/admin/categories/show',{shop_id});
        setCategories(data)
    }
    
    console.log(shops);
    const getItems = async () =>{
        axios.post(`/api/admin/items/show`).then(({data}) => {
            setShops(data.items);
        });
    }
    useEffect(() => {
        
        getItems();
        getShops();
    },[])
return (
<>
    <div className="container">
        
        <div className="btn btns" onClick={() => { 
            setCreate(true)
        }}>
            CREATE + 
        </div>
        <Link to="/admin/items/detetedrecord" className="btn btns float-end mb-2">Trashed Bin</Link>

        {/* CREATE ITEM  */}
        <Modal size="lg" show={create} onHide={() => { setCreate(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onClick={createItem}>
                        <input required className="form-control my-2 " type="text" name="name" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Name" />

                        <Form.Select required name="shop_id" onChange={(e) => { item.shop_id = e.target.value; getCategories(e.target.value) }} aria-label="Shop List" className="mb-3">
                            <option>Shop</option>
                            {
                                shopList.length != 0 ?
                                shopList.map((shop,index) => {
                                return <option key={index} value={shop.id}>{shop.shop_name}</option>
                                })
                                :
                                <option value="none">No data available..</option>
                            }

                        </Form.Select>
                        <Form.Select required name="category" onChange={(e) => { item.category_id = e.target.value }} aria-label="Category" className="mb-3">
                            <option>Category</option>
                            {
                                categories.length != 0 ?
                                categories.map((cate,index) => {
                                return <option key={index} value={cate.id}>{cate.name}</option>
                                })
                                :
                                <option value="none">No data available..</option>
                            }

                        </Form.Select>
                        <Form.Check required
                            defaultChecked 
                            name="is_available"
                            onChange={(e) => {setItem({...item,[e.target.name]:e.target.checked})}}
                            type="switch"
                            label="Is Available "
                        />

                        <Form.Select required name="privacy" onChange={(e) => { item.privacy = e.target.value }} aria-label="Privacy" className="mb-3">
                            <option value="public">Public </option>
                            <option value="private">Private</option>
                        </Form.Select>

                        <input required type="file" className="form-control" multiple  name="images" onChange={handleChange} placeholder="Item images" />

                        <input required className="form-control my-2 " type="text" name="tag" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="tag" />

                        <input required className="form-control my-2 " type="number" name="price" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Price" />

                        <input required className="form-control my-2 " type="date" name="special_date" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Special Date" />

                        <textarea required placeholder="description"  className="form-control my-2 " name="description" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} ></textarea>
 
                        <textarea required placeholder="remark"  className="form-control my-2 " name="remark" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} ></textarea>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { setCreate(false)}}>
                                Cancel
                            </Button>
                            <Button  className='btns' type="submit" >
                                Save
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
                
        </Modal>
        <Accordion className="my-3 ">
            
            {Object.values(shops).map((shop,index) => {
                return (
                    <Accordion.Item eventKey={index}  key={index}>
                        {/* Header : Shop Name Of Items  */}
                        <Accordion.Header>
                            {shop[0].category.shop.shop_name}
                        </Accordion.Header>

                        {/* Items Data Table  */}
                        <Accordion.Body>
                        <ToastContainer/>
                        <DataTable
                            title="Item Lists"
                            columns={columns}
                            data={shop}
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
        {/* CREATE ITEM  */}
        <Modal size="lg" show={edit} onHide={() => { setEdit(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={editItem}>
                        <input value={item.name} className="form-control my-2 " type="text" name="name" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Name" />

                        <Form.Select value={item.category.shop_id} name="shop_id" onChange={(e) => { item.shop_id = e.target.value; getCategories() }} aria-label="Shop List" className="mb-3">
                            <option>Shop</option>
                            {
                                shopList.length != 0 ?
                                shopList.map((shop,index) => {
                                return <option key={index} value={shop.id}>{shop.shop_name}</option>
                                })
                                :
                                <option value="none">No data available..</option>
                            }

                        </Form.Select>
                        <Form.Select value={item.category_id}  name="category" onChange={(e) => { item.category_id = e.target.value }} aria-label="Category" className="mb-3">
                            <option>Category</option>
                            {
                                categories.length != 0 ?
                                categories.map((cate,index) => {
                                return <option key={index} value={cate.id}>{cate.name}</option>
                                })
                                :
                                <option value="none">No data available..</option>
                            }

                        </Form.Select>
                        <Form.Check 
                            defaultChecked={item.is_available}

                            name="is_available"
                            onChange={(e) => {setItem({...item,[e.target.name]:e.target.checked})}}
                            type="switch"
                            label="Is Available "
                        />

                        <Form.Select defaultValue={item.privacy} name="privacy" onChange={(e) => { item.privacy = e.target.value }} aria-label="Privacy" className="mb-3">
                            <option value="public">Public </option>
                            <option value="private">Private</option>
                        </Form.Select>

                        <input  type="file" className="form-control" multiple  name="images" onChange={handleChange} placeholder="Item images" />

                        <input value={item.tag} className="form-control my-2 " type="text" name="tag" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="tag" />

                        <input value={item.price} className="form-control my-2 " type="number" name="price" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Price" />

                        <Form.Control value={item.special_range} className="form-control my-2 " type="date" name="special_date" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Special Date" />

                        <textarea value={item.description} placeholder="description"  className="form-control my-2 " name="description" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} ></textarea>

                        <textarea value={item.remark} placeholder="remark"  className="form-control my-2 " name="remark" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} ></textarea>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => { setEdit(false)}}>
                    Cancel
                </Button>
                <Button onClick={() => {editItem()}} className='btns' type="submit" >
                    Update
                </Button>
                </Modal.Footer>
        </Modal>
    </div>
</>
)
}


export default Items;
