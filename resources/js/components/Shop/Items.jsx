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

const { Meta } = Card;
const { TextArea } = Input;

const Items = () => {
    const {axios,setDialog} = useShopContext();
    const [items,setItems] = useState([]);
    const [categories,setCategories]  = useState([]);
    const [create,setCreate] = useState(false);
    const [loading,setLoading] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [viewItem,setViewItem]  = useState({
        name:"",
        price:"",
        is_available:"",
        privacy:"",
        taste:"",
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

    const [item] = useState({
        name:'',
        taste:'',
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
        formData.append('taste',item.taste);
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
        console.log(item.images)
        console.log(e.target.files);
        console.log(fileList)

    };



    useEffect(() => {
        axios.post('/api/shop/items/show').then(({data}) => {
            setItems(data.items)
        })
        getCategories();

    },[])


    return (
        <>
            <Button type="primary" onClick={() => {
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

                    <Input name="taste" onChange={(e) => {item.taste = e.target.value}} className="my-2 " placeholder="Taste" />
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
                        onChange={(date,dateString) => {item.special_date = dateString; console.log(item)}}
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
            <div className="row row-cols-1 row-cols-md-2 px-0">
                {items.map((item,index) => {

                return  <Card
                            key={index}
                            className="mx-lg-3 mb-sm-3 "
                            hoverable
                            loading={loading}
                            cover={<img style={{height:250,margin:0,padding:0}} alt="card image" src={`/images/shop/item/`+item.images[0]} />}
                            style={{ width: 300 ,margin:20,padding:0}}
                            >
                                <Meta title={item.name} description={`${item.description}`} />
                                <p>${item.price}</p>
                                <Button type="primary" onClick={() => {
                                    ShowOneItem(index)
                                }}>View More</Button>
                            </Card>

                })}
            </div>


            {/* ITEM ONE PAGE VIEW   */}
            <Modal
                width={1000}
                open={showItem}
                okButtonProps={{}}
                onOk={() => {
                  console.log(viewItem)
                  setShowItem(false);
                  setViewItem({});
                  setDialog(false);

                }}
                type
                onCancel={() => {setShowItem(false);setDialog(false)}}

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
                    {viewItem.taste}
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
