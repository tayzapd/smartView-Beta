import { useEffect, useState } from 'react';
import {useShopContext} from '../../Context/ShopContext';
import {
    Carousel,Card,
    Button,Input,
    InputNumber,Switch,Radio,
    DatePicker,Modal } from 'antd';
import { Form } from "react-bootstrap";

const {TextArea} = Input;
const ItemEdit = ({ citem }) => {
    const {cItem,itemEdit,setItemEdit,setDialog,axios} = useShopContext();
    const [fileList,setFileList] = useState([]);
    const [categories,setCategories] = useState([]);
    const [item,setItem] = useState({
        id:id,
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
    
    const handleChange = () => {
        console.log('i come from handleChange Method!');
    }

    const getCategories = () => {
        axios.get('/api/shop/category/show').then(({data}) => {
            setCategories(data.categories.data)
        })
   


    }
    
    const editItem = async  () => {
        
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
            const { data }  = axios.post(`/api/admin/shop/update`,formData);
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

            const { data }  = axios.post(`/api/shop/items/update`,formData);

        }     

        
        
    }

    useEffect(() => {
        getCategories()
    },[])
    return (
        <>
            <Modal
                width={1000}
                title="ITEM EDIT + "
                open={itemEdit}
                okButtonProps={{}}
                onOk={() => {
                  setItemEdit(false);
                  setDialog(false);

                }}
                onCancel={() => {setItemEdit(false);setDialog(false)}}

            >
                <div className="item-create h-100 " style={{
                    padding:"7px"
                }}>

                    <Input value={item.name} name="name" onChange={(e) => {item.name = e.target.value}} className="my-2 " allowClear placeholder="Name" />

                    <Input value={item.taste} name="taste" onChange={(e) => {item.taste = e.target.value}} className="my-2 " placeholder="Taste" />
                    <TextArea value={item.description} name="description" onChange={(e) => {item.description = e.target.value}} className="my-2 " style={{resize:'none'}} allowClear rows={4} placeholder="Description" maxLength={250} />

                    <InputNumber value={item.price} name="price" onChange={(value) => {item.price = value }} className="col-12 my-2" addonBefore="+" addonAfter="$" placeholder="Price " />

                    <div className="d-flex flex-row my-4 ">
                        <div className="col-3">
                            <div>Available</div>
                            <Switch checked={item.is_available} name="is_available" defaultChecked onChange={(value) => { item.is_available = value}} />
                        </div>
                        <div>
                        <div className="ml-4 ">Privacy </div>
                            <Radio.Group value={item.privacy} name="privacy" onChange={(e) => { item.privacy = e.target.value}} defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="private">Private</Radio.Button>
                                <Radio.Button value="public">Public</Radio.Button>
                            </Radio.Group>
                        </div>

                    </div>
                    <Form.Select value={item.category_id} name="category" onChange={(e) => { item.category = e.target.value }} aria-label="Category" className="mb-3">
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
                    <TextArea value={item.remark} name="remark" onChange={(e) => {item.remark = e.target.value}} className="my-2 " style={{resize:'none'}} allowClear rows={4} placeholder="Remark" maxLength={250} />

                    <DatePicker
                        value={item.special_date}
                        name="special_date"
                        onChange={(date,dateString) => {item.special_date = dateString;}}
                        className="form-control my-2 " style={{zIndex:2000}}></DatePicker>

                        <input type="file" className="form-control" multiple  name="images" onChange={handleChange} placeholder="Item images" />

                        {/* {fileList.length != 0 ?
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
                    } */}

                </div>
            </Modal>
        </>
    )
}


export default ItemEdit;