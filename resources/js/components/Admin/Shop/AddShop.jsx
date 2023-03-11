import { useEffect, useState } from "react";
import { useAdminContext } from "../../../Context/AdminContext";

const AddShop = () => {
    const {axios} = useAdminContext();
    const [shoptypes,setShoptypes] = useState([]);
    const [townships,setTownships] = useState([]);
    const [shopInput,setShop] = useState({
        shop_name:'',
        address:'',
        phone:'',
        remark:'' 
    });
    const [selectShoptype,setSelctShoptype] = useState();
    const [selectTownship,setSelctTownship] = useState();
    const [imageInput, setImage] = useState('');
    const [expired_date,setExpiredDate] = useState(null);

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
    // console.log(shoptypes);
    // console.log(townships);

    const handleChange = (e)=>{
        setImage({logo_image:e.target.files[0]});
    };

    const handleInput = (e)=>{
        setShop({...shopInput,[e.target.name]:e.target.value});
    }

    // console.log(expired_date);
    const saveshop = (e)=>{
        e.preventDefault();
        // const {name,address,phone} = shopInput;
        const data = new FormData();
        data.append('shop_name',shopInput.shop_name);
        data.append('address',shopInput.address);
        data.append('phone',shopInput.phone);
        data.append('expired_date',expired_date);
        data.append('shoptype_id',selectShoptype);
        data.append('township_id',selectTownship);
        data.append('remark',shopInput.remark);
        data.append('logo_image',imageInput.logo_image);
        
        // console.log(data);
        axios.post(`/api/admin/shops/create`,data)
            .then(res=>{
                // console.log(res);
                setShop({
                    shop_name:'',
                    address:'',
                    phone:'',
                    remark:'' 
                })
                window.location.reload(false);
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
                </div>
                <div className="mb-2">
                    <label>Logo Image</label>
                    <input type="file" name="logo_image" onChange={handleChange} className="form-control"/>
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