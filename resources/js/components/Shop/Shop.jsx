import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import {useShopContext} from '../../Context/ShopContext';
import { Input,Button } from 'antd';


const TextArea = Input;
const ShopProfile = () => {
    const {axios} = useShopContext();
    const {id} = useParams();
    const [uploadError,setUploadError] = useState(null);
    const [changeLogo,setChangeLogo] = useState(false);
    const [logoImage,setLogoImage] = useState({});
    const [shop,setShop] = useState({
        shop_name:'',
        address:'',
        phone:'',
        logo_image:''
    });

  


    const updateInfo = async () => {
        const form = new FormData();
        form.append("shop_name",shop.shop_name);
        form.append("address",shop.address);
        form.append("phone",shop.phone);
        form.append("logo_image",shop.logo_image);
        const req = await axios.post(`/api/shop/info/update`,form);
        if(req.status == true ){
            setShop(req.shop);
            getShop();
        }
    }

    const getShopInfo = async () => {
        const { data } = await axios.post('/api/user/shop/info/',{id:id});
        setShop(data.shop);
        setLogoImage('/images/shop/logo/'+data.shop.logo_image)
    }
   
    useEffect(() => {
        getShopInfo();
    },[]);
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
                            }} src={logoImage}
                            className='rounded-circle col-12' />
                        </div>
                        <br />
                        <br />
                        <style>
                            {`
                            .file-input-container {
                                display: flex;
                                flex-direction: column;
                              }
                              
                              .file-input-label {
                                font-size: 1rem;
                                font-weight: 500;
                                margin-bottom: 0.5rem;
                              }
                              
                              .file-input-wrapper {
                                position: relative;
                                display: inline-block;
                              }
                              
                              .file-input-button {
                                background-color: #007bff;
                                color: #fff;
                                border: none;
                                border-radius: 4px;
                                padding: 0.5rem 1rem;
                                font-size: 1rem;
                                font-weight: 500;
                                cursor: pointer;
                                transition: all 0.2s ease-in-out;
                              }
                              
                              .file-input-button:hover {
                                background-color: #0069d9;
                              }
                              
                              .file-input {
                                position: absolute;
                                top: 0;
                                left: 0;
                                opacity: 0;
                                width: 100%;
                                height: 100%;
                                cursor: pointer;
                              }
                              
                              .selected-file-name {
                                font-size: 0.9rem;
                                margin-top: 0.5rem;
                              }
                              
                              .upload-error-message {
                                color: red;
                                font-size: 0.9rem;
                                margin-top: 0.5rem;
                              }
                              
                            `}
                        </style>
                        <div className="file-input-container mt-3 ">
                            <div className="file-input-wrapper bg-info">
                                <input id="logo_image" name="logo_image" type="file" className="file-input custom-file-input" accept=".jpg,.jpeg,.png" onChange={(e) => {setShop({...shop,logo_image:e.target.files[0]});setLogoImage(URL.createObjectURL(e.target.files[0]))}} />
                                <button type="button" className="file-input-button col-12">Change Profile </button>
                            </div>
                            {shop.logo_image && <p className="selected-file-name">{shop.logo_image.name}</p>}
                            <small className="form-text text-muted">Accepted file formats: .jpg, .jpeg, .png</small>
                            {uploadError && <p className="upload-error-message">{uploadError}</p>}
                        </div>

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
