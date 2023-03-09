import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import {useShopContext} from '../../Context/ShopContext';
import { Input,Button } from 'antd';


const TextArea = Input;
const ShopProfile = () => {
    const {axios} = useShopContext();
    const {id} = useParams();
    const [shop,setShop] = useState({
        shop_name:'',
        address:'',
        phone:'',
    });


    const updateInfo = async () => {
        const req = await axios.post(`/api/shop/info/update`,shop);
        if(req.status == true ){
            setShop(req.shop);
        }
    }

    useEffect(() => {
        axios.post('/api/user/shop/info/',{id:id}).then((res) => {
        setShop(res.data.shop);
        })
    },[])
    return (
        <>
            <div className='my-1 px-3 py-3 shadow-sm text-muted'>
                <h4>
                    Expired Date :
                    {shop.expired_date}
                </h4>
            </div>
            <div className="shadow-lg pb-5 px-4 rounded-3 ">
            <div>
            <div className='d-md-flex flex-md-row  justify-content-center '>
                <div className="col-12 col-md-5 ">
                    <div className="my-3 d-flex flex-column justify-content-center ">
                        <div className='col-12'>
                            LOGO IMAGE
                        </div>
                        <br />
                        <hr />
                        <div className='d-flex justify-content-center'>
                            <img style={{
                                    height:'200px',
                                    width:'200px'                        
                                }} src="https://lut.im/7JCpw12uUT/mY0Mb78SvSIcjvkf.png"
                                className='rounded-circle col-12' />
                        </div>
                        <br />
                        <br />
                        <Button type='primary' className='mt-3 '>
                            Upload new logo image!
                        </Button>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="col-12 mt-5  my-5 px-3 py-3 ">
                        <div className='my-3'>
                            SHOP NAME
                            <br />
                            <Input value={shop.shop_name} onChange={(e) => {setShop({...shop,[e.target.name]:e.target.value})}} name="shop_name" className="my-2 " allowClear placeholder="Name" />
                        </div>

                        <div className='my-3'>
                            ADDRESS
                            <br />
                            <TextArea value={shop.address} onChange={(e) => {setShop({...shop,[e.target.name]:e.target.value})}} name="address" className="my-2 " style={{resize:'none'}}
                                allowClear rows={4} placeholder="Address" maxLength={250} />
                            </div>

                            <div className="my-3">
                                PHONE 
                                <br />
                                <Input value={shop.phone} onChange={(e) => {setShop({...shop,[e.target.name]:e.target.value})}}  name="phone"  className="my-2 " allowClear placeholder="Phone" />
                            </div> 
                        </div>
                </div>
                
            </div>
            <Button onClick={updateInfo} type='primary' style={{float:"right",marginRight:'30px',marginBottom:'20%'}} className='px-3 '>
                Save     
            </Button> 
                    
                    
            </div>
            </div>
        
            
        </>
    )
}



export default  ShopProfile;
