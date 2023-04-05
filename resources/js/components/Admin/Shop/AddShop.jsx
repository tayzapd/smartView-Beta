import { useEffect, useState } from "react";
import { useAdminContext } from "../../../Context/AdminContext";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddShop = ({handleClose}) => {
    const {axios,shops,setShops} = useAdminContext();
    const [shoptypes,setShoptypes] = useState([]);
    const [townships,setTownships] = useState([]);
    const [shopInput,setShop] = useState({
        shop_name:'',
        address:'',
        phone:'',
        remark:'',
        error_list:[],
    });
    const [selectShoptype,setSelctShoptype] = useState();
    const [selectTownship,setSelctTownship] = useState();
    const [imageInput, setImage] = useState('');
    const [bgImage, setBgImage] = useState([]);
    const [expired_date,setExpiredDate] = useState(null);

    const getShoptypes = ()=>{
        axios.post(`/api/admin/shoptypes/show`).then(res=>{
            setShoptypes(...shoptypes,res.data);
           
        })
    }




    const handleBgImageChange = (e) => {

        let files = e.target.files;
        setBgImage(files)
        // files.forEach((img) => {
        //     setBgImage([...bgImage,img]);
        // })
    };


    const getTownships = ()=>{
        axios.post(`/api/admin/townships/show`).then((res)=>{
            setTownships(...townships,res.data);
        })
    }

    useEffect(()=>{
        getShoptypes();
        getTownships();
    },[])


    const handleChange = (e)=>{
        setImage({logo_image:e.target.files[0]});
    };

    const handleInput = (e)=>{
        setShop({...shopInput,[e.target.name]:e.target.value});
    }

    const getShops = () => {
        axios.post(`/api/admin/shops/show`).then((res)=>{
            setShops(res.data.shops);
        })
    }
    const saveshop = (e)=>{
        e.preventDefault();
        
        const data = new FormData();
        
        console.log(bgImage);
        
        data.append('shop_name',shopInput.shop_name);
        data.append('address',shopInput.address);
        data.append('phone',shopInput.phone);
        data.append('expired_date',expired_date);
        data.append('shoptype_id',selectShoptype);
        data.append('township_id',selectTownship);
        data.append('remark',shopInput.remark);
        data.append('logo_image',imageInput.logo_image);
        for (let i = 0; i < bgImage.length; i++) {
            const img = bgImage[i];
            
            data.append('bg_images[]',img);
            
        }
     
        
        // console.log(data);
        // console.log(bgImage)
        axios.post(`/api/admin/shops/create`,data)
            .then(res=>{
                handleClose();
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
                getShops();
            }).catch((err)=>{
                console.log(err.response.data.error);
                setShop({...shopInput,error_list:err.response.data.error});
                
            })
    }
    return(
        <>
            <form onSubmit={saveshop} id="addshop">
            <div className="mb-2">
                    <label>Shop Type</label>
                    
                    <select name="shoptype" onChange={(e)=>setSelctShoptype(e.target.value)} className="form-select">
                    <option>Select Shop Type</option>
                        {shoptypes.map((shoptype, index) => (
                            <option key={index} value={shoptype.id} >
                                {shoptype.name}
                            </option>
                        ))}
                    </select>
                    <span className="text-danger">{shopInput.error_list.shoptype_id}</span>

                </div>
                <div className="mb-2">
                    <label>Township</label>
                    
                    <select name="township" onChange={(e)=>setSelctTownship(e.target.value)}  className="form-select">
                    <option>Select Township</option>
                        {townships.map((township, index) => (
                            <option key={index} value={township.id}>
                                {township.name}
                            </option>
                        ))}
                    </select>
                    <span className="text-danger">{shopInput.error_list.township_id}</span>

                </div>
                <div className="mb-2">
                    <label>Logo Image</label>
                    <input type="file" name="logo_image" onChange={handleChange} className="form-control"/>
                    <span className="text-danger">{shopInput.error_list.logo_image}</span>

                </div>

                <div className="mb-2">
                    <label>Bg Images</label>
                    <input type="file" className="form-control" multiple   onChange={handleBgImageChange} placeholder="Background Images" />

                </div>

                <div className="mb-2">
                    <label>Shop Name</label>
                    <input type="text" name="shop_name" onChange={handleInput} value={shopInput.shop_name} className="form-control"/>
                    <span className="text-danger">{shopInput.error_list.shop_name}</span>

                </div> 
                <div className="mb-2">
                    <label>Phone</label>
                    <input type="text" name="phone" onChange={handleInput} value={shopInput.phone} className="form-control"/>
                    <span className="text-danger">{shopInput.error_list.phone}</span>

                </div>
                <div className="mb-2">
                    <label>Address</label>
                    <textarea name="address" onChange={handleInput} value={shopInput.address} className="form-control"></textarea>
                    <span className="text-danger">{shopInput.error_list.address}</span>

                </div>

                
                <div className="mb-2">
                    <label>Expired_date</label>
                    <input type="date" name="expired_date" onChange={(e)=>setExpiredDate(new Date(e.target.value).toISOString().substring(0,10))} className="form-control"/>
                </div>
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={shopInput.remark} className="form-control"/>
                </div>
                
            </form>
        </>
    )
}

export default AddShop;