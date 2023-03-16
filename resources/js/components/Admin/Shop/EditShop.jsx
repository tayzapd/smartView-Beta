import { useEffect } from "react";
import { useAdminContext } from "../../../Context/AdminContext";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const EditShop = () =>{
    const {shop,axios,shops,setShops} = useAdminContext();
    const [shoptypes,setShoptypes] = useState([]);
    const [townships,setTownships] = useState([]);

    const getShoptypes = ()=>{
        axios.post(`/api/admin/shoptypes/show`).then(res=>{
            // console.log(res);
            setShoptypes(...shoptypes,res.data);
           
        })
    }

    const getTownships = ()=>{
        axios.post(`/api/admin/townships/show`).then((res)=>{
            // console.log(res);
            setTownships(...townships,res.data);
        })
    }

    useEffect(()=>{
        getShoptypes();
        getTownships();
    },[])

    const [shopInput,setShopInput] = useState({
        id:shop.id,
        shop_name:shop.shop_name,
        address:shop.address,
        phone:shop.phone,
        remark:shop.remark 
    });

    const [selectShoptype,setSelctShoptype] = useState({shoptype_id:shop.shoptype_id});
    const [selectTownship,setSelctTownship] = useState({township_id:shop.township_id});
    const [imageInput, setImage] = useState({
        logo_image:shop.logo_image
    });
    const [expired_date,setExpiredDate] = useState(shop.expired_date);
    const handleInput = (e)=>{
        setShopInput({...shopInput,[e.target.name]:e.target.value});
    }

    const handleChange =(e)=>{
        setImage({...imageInput,logo_image:e.target.files[0]});
    }

    const getShops = () => {
        axios.post(`/api/admin/shops/show`).then((res)=>{
            // console.log(res.data.shops);
            setShops(res.data.shops);
        })
    }
    
    // console.log(imageInput);
    const updateshop = (e)=>{
        e.preventDefault();
        // const {name,address,phone} = shopInput;
        const data = new FormData();
        data.append('id',shopInput.id)
        data.append('shop_name',shopInput.shop_name);
        data.append('address',shopInput.address);
        data.append('phone',shopInput.phone);
        data.append('expired_date',expired_date);
        data.append('shoptype_id',selectShoptype.shoptype_id);
        data.append('township_id',selectTownship.township_id);
        data.append('remark',shopInput.remark);
        data.append('logo_image',imageInput.logo_image);
        data.append('old_logo',shop.logo_image);
        
        // console.log(data);
        axios.post(`/api/admin/shops/update`,data)
            .then(res=>{
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
                getShops();
            })
    }
    return(
        <>
            <form onSubmit={updateshop} id="updateshop">
                <div className="mb-2">
                    <img src={window.location.origin+"/shoplogo/"+ shop.logo_image} className="img-thumbnail" alt="shoplogo" width={150} />
                </div>
                <div className="mb-2">
                    <label>Logo Image</label>
                    <input type="file" name="logo_image" onChange={handleChange}  className="form-control"/>
                </div>
                <div className="mb-2">
                    <label>Shop Type</label>
                    
                    <select name="shoptype" onChange={(e)=>setSelctShoptype({shoptype_id:e.target.value})} value={selectShoptype.shoptype_id}  className="form-control">
                    <option>Select Shop Type</option>
                        {shoptypes.map((shoptype, index) => (
                            <option key={index} value={shoptype.id} selected={(shoptype.id == selectShoptype.shoptype_id)?'selected':''}>
                                {shoptype.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label>Township</label>
                    
                    <select name="township" onChange={(e)=>setSelctTownship({township_id:e.target.value})} value={selectTownship.township_id}   className="form-select">
                    <option>Select Township</option>
                        {townships.map((township, index) => (
                            <option key={index} value={township.id} selected={(township.id == selectTownship.township_id)?'selected':''}>
                                {township.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-2">
                    <label>Shop Name</label>
                    <input type="text" name="shop_name" onChange={handleInput} value={shopInput.shop_name} className="form-control" required/>

                </div> 
                <div className="mb-2">
                    <label>Phone</label>
                    <input type="text" name="phone" onChange={handleInput} value={shopInput.phone} className="form-control" required/>
                </div>
                <div className="mb-2">
                    <label>Address</label>
                    <textarea name="address" onChange={handleInput} value={shopInput.address} className="form-control"></textarea>
                </div>

                
                <div className="mb-2">
                    <label>Expired_date</label>
                    <input type="date" name="expired_date" onChange={(e)=>setExpiredDate(new Date(e.target.value).toISOString().substring(0,10))} value={expired_date} className="form-control"/>
                </div>
                <div className="mb-2">
                    <label>Remark</label>
                    <input type="text" name="remark" onChange={handleInput} value={shopInput.remark} className="form-control"/>
                </div>
                
            </form>
        </>
    )
}

export default EditShop;