import { useState } from "react";
import { useEffect } from "react";
import { useParams,useLocation } from "react-router-dom";
import './css/item.css';
import { useShopContext } from "../../Context/ShopContext";
import { 
    Upload,Carousel,Card, 
    Button,Select ,Input,
    InputNumber,Switch,Radio, 
    DatePicker,Modal } from 'antd';
import { Form } from "react-bootstrap";
import { UploadOutlined } from '@ant-design/icons';
import { Height, LocalDining } from "@material-ui/icons";
const { Meta } = Card;
const { TextArea } = Input;

const Items = () => {
    const {user,token,users,setUsers,axios,setDialog} = useShopContext();
    const [items,setItems] = useState([]);
    const [categories,setCategories]  = useState([]);
    const [create,setCreate] = useState(false);
    const [loading,setLoading] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [viewItem,setViewItem]  = useState({});
    const [showItem,setShowItem] = useState(false);

    const [item,setItem] = useState({
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
        axios.post('/api/shop/category/show').then(({data}) => {
            setCategories(data.categories)
        })
        const stopLoader = () => {
            setLoading(false);
        }
        setTimeout(stopLoader,3000)

      
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
    
    const uploadProps = {
        onRemove: handleRemove,
        beforeUpload: () => false,
        fileList:item.images,
        maxLength:4,
        showUploadList:false,
        onChange: handleChange,
        multiple: true,
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
                <div className="overflow-auto h-50">
                    <form onSubmit={() => {}}> 

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
                            {/* <Upload name="images" {...uploadProps} className="my-2 col-12 text-center justify-content-center ">
                                <Button className="col-12 w-100 upload-btn " icon={<UploadOutlined />}>Select Images</Button>
                            </Upload> */}
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
                        
                    </form>
                </div>
            </Modal>
      
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
                title={
                    <header className="font-weight-bold" style={{fontSize:'20px',fontWeight:'bold'}}>
                        {viewItem.name}
                   </header>
                }
      
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
                <div className="overflow-auto h-sm-100 h-lg-75 shadow-sm  " style={{background:'#ffffff'}}>
                   
                   <p className="text-muted">
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
                   </p>
                   {
                    viewItem.images ? 
                    <Carousel
                            autoplay={true}
                            className="col"
                        >
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
                    <span></span>
                   }
                    
                    <div className="d-block text-info bg-danger">helo WOrl</div>
                </div>

                
            </Modal>

            <style>
                {`
      
                    .ant-modal-close {
                        display:none !important
                    }

                    .ant-modal-header {
                        margin-left:20px;
                    }

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
