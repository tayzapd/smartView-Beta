import { useEffect,useState } from "react";
import { useAdminContext } from "../../Context/AdminContext";
import { 
    Accordion,Form,Modal,
    Button,
 } from "react-bootstrap";
import DataTable from "react-data-table-component";
const Items = () => {
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
            name: 'Category Name',
            selector: row => row.category.name,
        },
        {
            name: 'Taste',
            selector: row => row.taste,
        },
        {
            name: 'Privacy',
            selector: row => row.privacy,
        },
        {
            name:"Edit",
            selector: (row) => 
            <button
                className='btn btn-primary'
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
        formData.append('taste',item.taste);
        formData.append('special_range',item.special_date);
        formData.append('privacy',item.privacy);
        formData.append('is_available',item.is_available);
        formData.append('category_id',item.category_id);
        try {
            axios.post('/api/admin/items/create', formData);
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
            formData.append('taste',item.taste);
            formData.append('special_range',item.special_date);
            formData.append('privacy',item.privacy);
            formData.append('is_available',item.is_available);
            formData.append('category_id',item.category_id);
            const { data }  = axios.post(`/api/admin/items/update`,formData);
        }
        else {
            let formData = {
                id:item.id,
                name:item.name,
                shop_id:item.shop_id,
                price:item.price,
                description:item.description,
                remark:item.remark,
                taste:item.taste,
                special_range:item.special_date,
                privacy:item.privacy,
                is_available:item.is_available,
                category_id:item.category_id,
            };

            const { data }  = axios.post(`/api/admin/items/update`,formData);

        }     

        
        
    }

    const deleteItem =  async (id)  => {
        const { data } = axios.post('/api/admin/items/delete',{id:id});


    }

    const handleChange = (e) => {

        for (let i = 0; i < e.target.files.length; i++) {
            setFileList([...fileList,e.target.files[i]])
        }

        item.images = e.target.files;
        console.log(item.images)
        console.log(e.target.files);
        console.log(fileList)

    };

    const getShops = async  () => {
        const { data } = await axios.post(`/api/admin/shops/show`); 
        setShopList(data.shops);
    }
    const getCategories = async (shop_id) => {
        const { data } = await axios.post('/api/admin/categories/show',{shop_id});
        setCategories(data)
    }

    useEffect(() => {
        axios.post(`/api/admin/items/show`).then(({data}) => {
            setShops(data.items);
        });

        getShops();
    },[])
return (
<>
    <div className="container">
        
        <div className="btn btn-primary" onClick={() => { 
            setCreate(true)
        }}>
            CREATE + 
        </div>
        {/* CREATE ITEM  */}
        <Modal size="lg" show={create} onHide={() => { setCreate(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={createItem}>
                        <input className="form-control my-2 " type="text" name="name" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Name" />

                        <Form.Select name="shop_id" onChange={(e) => { item.shop_id = e.target.value; getCategories() }} aria-label="Shop List" className="mb-3">
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
                        <Form.Select name="category" onChange={(e) => { item.category_id = e.target.value }} aria-label="Category" className="mb-3">
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
                            defaultChecked 
                            name="is_available"
                            onChange={(e) => {setItem({...item,[e.target.name]:e.target.checked})}}
                            type="switch"
                            label="Is Available "
                        />

                        <Form.Select name="privacy" onChange={(e) => { item.privacy = e.target.value }} aria-label="Privacy" className="mb-3">
                            <option value="public">Public </option>
                            <option value="private">Private</option>
                        </Form.Select>

                        <input type="file" className="form-control" multiple  name="images" onChange={handleChange} placeholder="Item images" />

                        <input className="form-control my-2 " type="text" name="taste" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Taste" />

                        <input className="form-control my-2 " type="number" name="price" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Price" />

                        <input className="form-control my-2 " type="date" name="special_date" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Special Date" />

                        <textarea placeholder="description"  className="form-control my-2 " name="description" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} ></textarea>
 
                        <textarea placeholder="remark"  className="form-control my-2 " name="remark" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} ></textarea>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => { setCreate(false)}}>
                    Close
                </Button>
                <Button onClick={() => {createItem()}} variant="primary" type="submit" >
                    Save
                </Button>
                </Modal.Footer>
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
                        <DataTable
                            title="Category Lists"
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

                        <input value={item.taste} className="form-control my-2 " type="text" name="taste" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Taste" />

                        <input value={item.price} className="form-control my-2 " type="number" name="price" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Price" />

                        <Form.Control value={item.special_range} className="form-control my-2 " type="date" name="special_date" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} placeholder="Special Date" />

                        <textarea value={item.description} placeholder="description"  className="form-control my-2 " name="description" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} ></textarea>

                        <textarea value={item.remark} placeholder="remark"  className="form-control my-2 " name="remark" onChange={(e) => {setItem({...item,[e.target.name]:e.target.value})}} ></textarea>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => { setEdit(false)}}>
                    Close
                </Button>
                <Button onClick={() => {editItem()}} variant="primary" type="submit" >
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
    </div>
</>
)
}


export default Items;
