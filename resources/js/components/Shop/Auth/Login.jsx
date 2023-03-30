import { useEffect } from "react";
import { useState } from "react"
import { useShopContext } from "../../../Context/ShopContext";
import { Button } from 'antd';
import { useNavigate, useParams } from "react-router-dom";


const ShopLogin = () => {
    const {user,token,setToken,setUser,axios} = useShopContext();
    const {id} = useParams();
    const [start,setStart] = useState(false);
    const [login,setLogin] = useState({
        username:'',
        password:'',
        shop_id:id
    });
    const [shop,setShop]  =useState({});

    const router = useNavigate();
    const Login = (e) => {
        e.preventDefault();
        axios.post('/api/login',login).then(res => {
            if(res.data.token == null && res.data.status == false){
                return 0;
            }
            setToken(res.data.token);
            axios.get('/api/user').then(res => {
                setUser(res.data);
            })
            router(`/shop/${id}/owner`);
        })
    }

    useEffect(() => {
        axios.post('/api/user/shop/info/',{id:id}).then((res) => {
            setShop(res.data.shop);
        })
    },[])

    return (
        <>
            {start == true ? <div className="responsive-box my-lg-3    ">
                <div className="container d-flex  justify-content-center align-item-center  ">
                    <div className="d-flex justify-content-center align-item center px-3   logo-image-main" >
                        <div className="d-flex justify-content-center align-item center px-4 py-2   logo-image-box">
                            <img className="shop-logo-image rounded-pill" src="https://static.vecteezy.com/system/resources/previews/008/891/971/original/food-store-logo-design-concept-grocery-logo-illustration-basket-with-food-logo-vector.jpg" />
                        </div>
                    </div>

                    
                </div>
                <div className="container d-flex  justify-content-center align-item-center mt-3 ">
                    <div className="d-flex justify-content-center align-item center px-4   ">
                        <h2 className="shop-name-title ">
                            {
                                shop.shop_name ? 
                                <span>
                                    {shop.shop_name}
                                </span>
                                :
                                <span></span>
                            }
                        </h2>
                    </div>
                </div>

                <div onSubmit={Login} className="container d-flex  justify-content-center align-item-center mt-3 ">
                    <form  className="d-flex col-12 col-md-6 col-lg-5 flex-column justify-content-center align-item center px-4 py-4  ">
                        <input onChange={(e) => { login.username = e.target.value }} placeholder="username" type="text" className="form-control username"  />
                        <input onChange={(e) => { login.password = e.target.value }} placeholder="password" type="password" className="form-control password" />

                        <input type="submit" value="Sing in" className="btn btn-block mt-3 bg-warning py-3 btn-sing-in" />
                    </form>
                </div>

                <div className="container d-flex  justify-content-center align-item-center mt-1 mb-5">
                    <div className="d-flex justify-content-center align-item center px-4   ">
                        <b className="forget-password-sing-in">
                            Forget Password?
                        </b>
                    </div>
                </div>
            </div>
            :
            <div className="container d-flex flex-column  justify-content-center align-item-center   ">
                <img 
                    style={{marginTop:"100px"}}
                    src="https://eat-to-eat.com/new/assets/images/custom/commandez.png" 
                />

                <div className="w-100"></div>

                <h1 className="text-center" style={{fontSize:"2rem",fontWeight:"900",marginTop:'50px'}}>
                    Pick <span className="text-warning">Your</span> 
                    <br />
                     Choice Peacefully  
                </h1>
                

                <div className="w-100"></div>

                <p className="mt-5 text-muted" style={{textAlign:'center'}}>
                    <span className="text-warning">
                        Smart View 
                    </span>  
                     is bring your smart life <br />
                    for looking menu in shop.
                </p>
                

                <div className="w-100"></div>

                <div className="d-flex justify-content-center align-item-center" style={{marginTop:"60px",height:'50px'}} >
                    <button onClick={() => {setStart(true)}}  className="btn rounded-2 col-8 " style={{background:"#5227cc",color:"white",buttom:'0'}}>
                        Get Started
                    </button>
                </div>
            </div>
            }
            <style>
                {`  
                

                    @import url('https://fonts.googleapis.com/css?family=Climate+Crisis');

                    .forget-password-sing-in {
                        font-weight:bold
                    }
                    .btn-sing-in {
                        font-weight:600px;
                        font-size:20px 
                    }

                    
                    .form-control { 
                        margin-top:10px;
                        margin-buttom:5px;
                        padding: 15px 15px;
                        border:0px;
                        background:rgba(0,0,0,0.2);
                    }
                    .form-control:horver {
                        margin-top:10px;
                        margin-buttom:5px;
                        border:0px;
                        background:rgba(0,0,0,0.2);
                    }
                    .username {
                        border-radius: 10px 10px 0px 0px;
                    }
                    .password {
                        border-radius: 0px 0px 10px 10px;
                    }
                    .shop-name-title {
                        font-size:20px;
                        font-family: 'Climate Crisis', sans-serif;
                    }

                    .shop-logo-image {
                        background:white;
                        width:90px;
                        height:100px;
                        margin-top:70%
                        
                    }
                    .logo-image-box {
                        background:black;
                        height:200px;
                        border-radius: 0px 0px 70px 70px;
                        padding-top:30%;
                    }
                    .logo-image-main {
                        background:rgba(0,0,0,0.2 );
                        height:220px;
                        border-radius: 0px 0px 75px 75px;
                        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                    }

                    @media (min-width: 500px) {
                        .responsive-box {
                            margin-left:10%;
                            margin-right:10%;
                            padding: 5px 5px 5px 5px ;
                            box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
                        }
                    }
                    
                    @media all and  (max-width:500px){
                        
                    }
                `}
            </style>
        </>
    )
}

export default ShopLogin; 