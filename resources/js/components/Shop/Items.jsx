import { useState } from "react";
import { useEffect } from "react";
import './css/item.css';
import { useShopContext } from "../../Context/ShopContext";
import {
    Carousel,Card,
    Button,Input,
    InputNumber,Switch,Radio,
    DatePicker,Modal } from 'antd';
import { Form } from "react-bootstrap";
import { EditOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
const { Meta } = Card;
const { TextArea } = Input;

const Items = () => {
    const {axios,setDialog} = useShopContext();
    const [items,setItems] = useState([]);
    const [categories,setCategories]  = useState([]);
    const [create,setCreate] = useState(false);
    const [edit,setEdit] = useState(false);
    const [loading,setLoading] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [viewItem,setViewItem]  = useState({
        name:"",
        price:"",
        is_available:"",
        privacy:"",
        tag:"",
        images:[],
        time_limited:"",
        special_range:"",
        description:"",
        remark:"",
        created_at:"",
        updated_at:"",
        category:{name:''},
    });

    const [editCItem,setditCItem]  = useState({
        name:"",
        price:"",
        is_available:"",
        privacy:"",
        tag:"",
        images:[],
        time_limited:"",
        special_range:"",
        description:"",
        remark:"",
        created_at:"",
        updated_at:"",
        category:{name:''},
    });


    const [showItem,setShowItem] = useState(false);

    const [item,setItem] = useState({
        name:'',
        tag:'',
        price:null,
        is_available:true,
        privacy:'public',
        category:'',
        remark:'',
        description:'',
        special_date:'',
        images:[]
    });

    const getCategories = () => {
        axios.get('/api/shop/category/show').then(({data}) => {
            setCategories(data.categories.data)
        })
        const stopLoader = () => {
            setLoading(false);
        }
        setTimeout(stopLoader,1500)


    }


    const ShowOneItem  = (index)  => {
        setShowItem(true);
        let item = items[index];
        setViewItem(item);
        setDialog(true);
        console.log(viewItem)
    }

    const createItem = () => {
        const formData = new FormData();
        fileList.forEach(img => {
            formData.append('images[]',img)
        })


        formData.append('name',item.name);
        formData.append('price',item.price);
        formData.append('description',item.description);
        formData.append('remark',item.remark);
        formData.append('tag',item.tag);
        formData.append('special_range',item.special_date);
        formData.append('privacy',item.privacy);
        formData.append('is_available',item.is_available);
        formData.append('category_id',item.category);
        try {
            axios.post('/api/shop/items/create', formData);
        } catch (err) {
            console.log(err); // handle error response from server
        }
    };

    const editItem = () => {
        console.log(editCItem)
        const formData = new FormData();
        fileList.forEach(img => {
            formData.append('images[]',img)
        })


        formData.append('id',editCItem.id);
        formData.append('name',editCItem.name);
        formData.append('price',editCItem.price);
        formData.append('description',editCItem.description);
        formData.append('remark',editCItem.remark);
        formData.append('tag',editCItem.tag);
        formData.append('special_range',editCItem.special_range);
        formData.append('privacy',editCItem.privacy);
        formData.append('is_available',editCItem.is_available);
        formData.append('category_id',editCItem.category_id);
        try {
            axios.post('/api/shop/items/update', formData);
        } catch (err) {
            console.log(err); 
        }
    };




    const handleRemove = (file) => {
        const index = item.images.indexOf(file);
        const newFileList = item.images.slice();
        newFileList.splice(index, 1);
        item.images = newFileList;
    };



    const handleChange = (e) => {

        for (let i = 0; i < e.target.files.length; i++) {
            setFileList([...fileList,e.target.files[i]])
        }

        item.images = e.target.files;

    };



    useEffect(() => {
        axios.post('/api/shop/items/show').then(({data}) => {
            setItems(data.items)
        })
        getCategories();

    },[])


    return (
        <>
            <Button className="mt-4 " type="primary" onClick={() => {
                setCreate(true)
                setDialog(true)
                }}>
                CREATE +
            </Button>

            <Modal
                width={1000}
                title="ITEM CREATE + "
                open={create}
                okButtonProps={{}}
                onOk={() => {
                  createItem()
                  setCreate(false);
                  setDialog(false);

                }}
                onCancel={() => {setCreate(false);setDialog(false)}}

            >
                <div className="item-create h-100 " style={{
                    padding:"7px"
                }}>

                    <Input name="name" onChange={(e) => {item.name = e.target.value}} className="my-2 " allowClear placeholder="Name" />

                    <Input name="tag" onChange={(e) => {item.tag = e.target.value}} className="my-2 " placeholder="tag" />
                    <TextArea name="description" onChange={(e) => {item.description = e.target.value}} className="my-2 " style={{resize:'none'}} allowClear rows={4} placeholder="Description" maxLength={250} />

                    <InputNumber name="price" onChange={(value) => {item.price = value }} className="col-12 my-2" addonBefore="+" addonAfter="$" placeholder="Price " />

                    <div className="d-flex flex-row my-4 ">
                        <div className="col-3">
                            <div>Available</div>
                            <Switch name="is_available" defaultChecked onChange={(value) => { item.is_available = value}} />
                        </div>
                        <div>
                        <div className="ml-4 ">Privacy </div>
                            <Radio.Group name="privacy" onChange={(e) => { item.privacy = e.target.value}} defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="private">Private</Radio.Button>
                                <Radio.Button value="public">Public</Radio.Button>
                            </Radio.Group>
                        </div>

                    </div>
                    <Form.Select name="category" onChange={(e) => { item.category = e.target.value }} aria-label="Category" className="mb-3">
                        <option>Category</option>
                        {
                            categories.length != 0 ?
                            categories.map(cate => {
                            return <option key={cate.id} value={cate.id}>{cate.name}</option>
                            })
                            :
                            <span></span>
                        }

                    </Form.Select>
                    <TextArea name="remark" onChange={(e) => {item.remark = e.target.value}} className="my-2 " style={{resize:'none'}} allowClear rows={4} placeholder="Remark" maxLength={250} />

                    <DatePicker
                        name="special_date"
                        onChange={(date,dateString) => {item.special_range = dateString;}}
                        className="form-control my-2 " style={{zIndex:2000}}></DatePicker>

                        <input type="file" className="form-control" multiple  name="images" onChange={handleChange} placeholder="Item images" />

                        {fileList.length != 0 ?
                            <Carousel
                                className="col h-50 carousel"
                            >
                            {fileList.map((file,index) => (
                                <div key={index}>
                                <img
                                    className="img-thumbnail"
                                    src={URL.createObjectURL(file)}
                                    alt={file.name} />
                                </div>
                        ))}
                        </Carousel>
                        :
                        <span></span>
                    }

                </div>
            </Modal>

            {/* ITEM EDIT  */}
            <Modal
                width={1000}
                title="ITEM EDIT + "
                open={edit}
                okButtonProps={{}}
                onOk={() => {
                  editItem();
                  setEdit(false);
                  setDialog(false);
                }}
                onCancel={() => {setEdit(false);setDialog(false)}}

            >
                <div className="item-create h-100 " style={{
                    padding:"7px"
                }}>

                    <Input value={editCItem.name} name="name" onChange={(e) => {setditCItem({...editCItem,[e.target.name]:e.target.value})}} className="my-2 " allowClear placeholder="Name" />

                    <Input value={editCItem.tag} name="tag" onChange={(e) => {setditCItem({...item,[e.target.name]:e.target.value})}} className="my-2 " placeholder="tag" />
                    <TextArea value={editCItem.description} name="description" onChange={(e) => {setditCItem({...item,[e.target.name]:e.target.value})}} className="my-2 " style={{resize:'none'}} allowClear rows={4} placeholder="Description" maxLength={250} />

                    <InputNumber value={editCItem.price} name="price" onChange={(value) => {setditCItem({...editCItem,price:value})}} className="col-12 my-2" addonBefore="+" addonAfter="$" placeholder="Price " />

                    <div className="d-flex flex-row my-4 ">
                        <div className="col-3">
                            <div>Available</div>
                            <Switch  name="is_available" checked={editCItem.is_available} onChange={(value) => { setditCItem({...editCItem,is_available:value})}} />
                        </div>
                        <div>
                        <div className="ml-4 ">Privacy </div>
                            <Radio.Group value={editCItem.privacy} name="privacy" onChange={(e) => { setditCItem({...item,[e.target.name]:e.target.value})}} defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="private">Private</Radio.Button>
                                <Radio.Button value="public">Public</Radio.Button>
                            </Radio.Group>
                        </div>

                    </div>
                    <Form.Select value={editCItem.category_id} name="category_id" onChange={(e) => {console.log(e.target.value); setditCItem({...item,category_id:e.target.value}) }} aria-label="Category" className="mb-3">
                        <option>Category</option>
                        {
                            categories.length != 0 ?
                            categories.map(cate => {
                            return <option key={cate.id} value={cate.id}>{cate.name}</option>
                            })
                            :
                            <span></span>
                        }

                    </Form.Select>
                    <TextArea value={editCItem.remark} name="remark" onChange={(e) => {setditCItem({...editCItem,[e.target.name]:e.target.value})}} className="my-2 " style={{resize:'none'}} allowClear rows={4} placeholder="Remark" maxLength={250} />

                    <DatePicker
                        defaultValue={dayjs(editCItem.special_range,"YYYY-MM-DD")}
                        name="special_range"
                        onChange={(date,dateString) => {item.special_range = dateString}}
                        className="form-control my-2 " style={{zIndex:2000}}></DatePicker>

                        <input type="file" className="form-control" multiple  name="images" onChange={handleChange} placeholder="Item images" />

                        {fileList.length != 0 ?
                            <Carousel
                                className="col h-50 carousel"
                            >
                            {fileList.map((file,index) => (
                                <div key={index}>
                                <img
                                    className="img-thumbnail"
                                    src={URL.createObjectURL(file)}
                                    alt={file.name} />
                                </div>
                        ))}
                        </Carousel>
                        :
                        <span></span>
                    }

                </div>
            </Modal>
            {/* item cards */}
            <div className="d-flex flex-column justify-content-center align-item-center">
                    {
                        items.map((item,id) => {
                            return <div key={id} 
                                        className="card mx-0 mx-lg-3 mb-sm-3 col-12 col-md-3 my-1 rounded-4 " 
                                        onClick={() => {
                                            ShowOneItem(id)
                                            setItemImages(item.images)
                                            setCurrentImage(`/images/shop/item/`+item.images[0])
                                        }}>
                                    <div className="row no-gutters">
                                        <div className="col-6 px-2 py-2">
                                            <img style={{height:'130px',marginLeft:'10px'}} className="card-img rounded-4 col-12 " src={`/images/shop/item/`+item.images[0]} />
                                            <div style={{
                                                position:"absolute",
                                                top:"10px",
                                                paddingTop:'10px',
                                                left:'16px',
                                                color:"white"
                                            }}>
                                                <Button 
                                                onClick={() => {
                                                    setDialog(false);   
                                                    let i = item;
                                                    
                                                    i.special_range = item.special_range.substring(0,10);
                                                    setditCItem(i);
                                                    setditCItem({...item,category_id:i.category_id});
                                                    editCItem.shop_id = i.category.shop_id;
                                                    editCItem.images = [];
                                                    editCItem.is_available = i.is_available == 1 ? true : false; 
                                                    getCategories(editCItem.category.shop_id);
                                                    
                                                    setEdit(true);                                     
                                                }} type="primary" icon={<EditOutlined />} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="card-body py-2 px-2 mr-2 text-center">
                                                <h6 style={{fontSize:"20px",fontWeight:'900'}} className="col-12 mt-2 ">{item.name}</h6>
                                                <p className="card-title ">{item.category.name}</p>
    
                                                <div className="text-warning" style={{marginTop:'30px'}}>
                                                    {item.price} MMK 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        })
                    }
                    </div>
            {/* <div className="row row-cols-3 row-cols-md-3 px-0">
                {items.map((item,index) => {

                return  <Card
                            key={index}
                            className="mx-lg-3 mb-sm-3 "
                            hoverable
                            loading={loading}
                            onClick={() => {
                                ShowOneItem(index)
                            }}
                            cover={
                                
                                <>
                                <img style={{height:250,margin:0,padding:0}}  src={`/images/shop/item/`+item.images[0]}/>
                                <div style={{
                                    position:"absolute",
                                    top:"8px",
                                    left:'16px',
                                    color:"white"
                                }}>
                                    <Button onClick={() => {
                                        setDialog(false);   
                                        let i = item;
                                        
                                        i.special_range = item.special_range.substring(0,10);
                                        setditCItem(i);
                                        setditCItem({...item,category_id:i.category_id});
                                        editCItem.shop_id = i.category.shop_id;
                                        editCItem.images = [];
                                        editCItem.is_available = i.is_available == 1 ? true : false; 
                                        getCategories(editCItem.category.shop_id);
                                        
                                        setEdit(true);                                     
                                    }} type="primary" icon={<EditOutlined />} />
                                </div>
                                </>
                            }
                            style={{ width: 300 ,margin:20,padding:0}}
                            >
                                <Meta title={item.name} description={`${item.description}`} />
                                <p>${item.price}</p>
                            </Card>
                })}
            </div> */}

            {/* ITEM ONE PAGE VIEW   */}
            <Modal
                width={1000}
                open={showItem}
                okButtonProps={{}}
                onOk={() => {
                  setShowItem(false);
                  setViewItem({});
                  setDialog(false);

                }}
                type
                cancelButtonProps={{
                    hidden:true
                }}

            >

                <div className="shadow-sm  d-flex flex-row h-auto" style={{background:'#ffffff'}}>
                    <div id="d-sm-none" className="col-md-4 h-auto"></div>
                    <div className="col-12 col-md-5 d-block h-100 h-auto">
                        {
                            viewItem.images ?
                                <Carousel
                                    autoplay={true}>
                                    {viewItem.images.map((img,index) => (
                                        <div key={index}>
                                            <img
                                                className="img-thumbnail rounded-0 border-0"
                                                src={`/images/shop/item/`+img}
                                                alt={img} />
                                        </div>
                                    ))}
                                </Carousel>
                                :
                                <span className='col-12 col-md-5'></span>
                        }
                    </div>
                    <div id="d-sm-none" className="col col-md-3 h-auto"></div>
                </div>
   

                <div className="col row d-block  " id="item-content">
                    <div className="col-12 pt-2 font-weight-bold" style={{fontSize:'20px',fontWeight:'bold'}}>
                        {viewItem.name}
                    </div>
                    <div className="text-muted col-12">
                        {
                            viewItem.category ?
                            <span style={{
                                background:'rgba(0,0,0,0.1)',
                                marginTop:'5px',
                                marginLeft:'15px',
                                borderRadius:'20px',
                                padding:'5px'
                            }}>
                               #{viewItem.category.name}
                            </span>
                            :
                            <span>
                                Not Have
                            </span>
                        }

                    <span style={{fontWeight:'bold'}} className='text-warning mx-3'>
                        {viewItem.price} Kyats
                    </span>

                    <span className="text-muted">
                        {viewItem.view} views 
                    </span>
                   </div>
                </div>
                <div className="mt-3 px-3 py-3 ">
                    {
                        viewItem.is_available == 1 ? 
                        <span 
                        style={{
                            background:"yellowgreen"
                        }}
                        className="rounded-pill py-1 px-2 " >Available</span>
                        :
                        <span className="rounded-pill bg-danger py-1 px-2 ">Not Available </span>
                    }
                    <span className="mx-3 ">
                    {viewItem.tag}
                    </span>
                </div>

                <div>
                    <h4>Description</h4>
                    <p>
                        {viewItem.description}
                    </p>
                </div>


            </Modal>

            <style>
                {`
                    .ant-modal-footer {
                        padding:10px !important;
                        margin:10px !important;
                    }
                `}
            </style>

        </>
    )
}


export default Items;
