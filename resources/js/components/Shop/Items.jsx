import { useState } from "react";
import { useEffect } from "react";
import { useParams,useLocation } from "react-router-dom";
import { useShopContext } from "../../Context/ShopContext";
import { Card, Button,Select ,Input,InputNumber,Switch,Radio, DatePicker,Modal } from 'antd';
import { Form } from "react-bootstrap";
import { SportsRugbySharp } from "@material-ui/icons";

const { Meta } = Card;
const { TextArea } = Input;
const {RangePicker } = DatePicker

const Items = () => {
    const {user,token,users,setUsers,axios,setDialog} = useShopContext();
    const [items,setItems] = useState([]);
    const [create,setCreate] = useState(false);

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
    })
 

    useEffect(() => {
        axios.post('/api/shop/items/show').then(({data}) => {
            setItems(data.items)
        })
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
                // This was removed
                // centered
                getContainer={() => {document.getElementById('root')}}
                visible={create}
                onOk={() => {setCreate(false) ;setDialog(false) }}
                onCancel={() => {setCreate(false);setDialog(false)}}

            >
                    <form onSubmit={() => {}}> 
                        <Input className="my-2 " allowClear placeholder="Name" />
                        
                        <Input className="my-2 " placeholder="Taste" />
                        <TextArea className="my-2 " style={{resize:'none'}} allowClear rows={4} placeholder="Description" maxLength={250} />

                        <InputNumber className="col-12 my-2" addonBefore="+" addonAfter="$" placeholder="Price " />

                        <div className="d-flex flex-row my-4 ">
                            <div className="col-3">
                                <div>Available</div>
                                <Switch defaultChecked onChange={() => {}} />
                            </div>
                            <div>
                                <div className="ml-4 ">Privacy </div>
                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                    <Radio.Button value="a">Private</Radio.Button>
                                    <Radio.Button value="b">Public</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <Form.Select aria-label="Category" className="mb-3">
                            <option>Category</option>
                            <option value="1">Some</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <TextArea className="my-2 " style={{resize:'none'}} allowClear rows={4} placeholder="Remark" maxLength={250} />
                        
                        <div className="col-12 " style={{display:'block'}}>
                            <DatePicker className="form-control" style={{zIndex:2000}}></DatePicker>
                        </div>

                        
                        
                    </form>
            </Modal>
      <style>
        {`
        .ant-modal, .ant-modal-content {
            height: 100vh;
            width: 100vw;
            margin: 0;
            top: 0;
           }
           .ant-modal-body {
            height: calc(100vh - 110px);
           }
           
        `}

      </style>
            <div className="row row-cols-1 row-cols-md-2 px-0">
                {items.map((item,index) => {
                     
                return  <Card
                            key={index}
                            className="mx-lg-3 mb-sm-3 "
                            hoverable
                            cover={<img alt="card image" src={`/images/shop/logo/`+item.images} />}
                            style={{ width: 300 ,margin:20}}
                            >
                                <Meta title={item.category.name} description={`$${item.price}`} />
                                <p>{item.description}</p>
                                <Button type="primary">View More</Button>
                            </Card>
                        
                })}
            </div>
        </>
    )
}


export default Items;
