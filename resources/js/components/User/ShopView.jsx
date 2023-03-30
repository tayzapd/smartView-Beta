import { useEffect, useState } from "react";
import { Close } from "@material-ui/icons";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShopView = () => {
    const [currentImage, setCurrentImage] = useState('https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg');
    const [shop,setShop] = useState({
        shoptype:{name:''},
        shop_name:'',
        address:'',
        phone:'',
        remark:''
    });
    const { id } = useParams();

    const getShopInfo = async  () => {
       const { data } = await axios.post('/api/user/shop/info/',{id:id});
       setShop(data.shop);
    }
    const handleClick = (newImage) => {
        setCurrentImage(newImage);
    }

    useEffect(() => {
        getShopInfo();
    },[])
    return (
        <>
            <div className="container row mt-4  ">
                <div className="col">
                    <h4 className="shop-name">
                        {shop.shop_name}
                    </h4>
                </div>
                <div className="col"></div>
                <div className="col" >
                    <span style={{float:'right'}}>
                     <Close /> 
                    </span>
                </div>
            </div>

            <div className="container mr-5">
                <p className="text-muted" style={{marginLeft:"10px"}}>
                    {shop.shoptype ? 
                        shop.shoptype.name
                    :
                        <span></span>
                    }
                </p>
            </div>
            

            <div className="slider-container px-3">
                <img src={currentImage} className="main-image rounded-4 " />
                <div className="d-flex flex-row justify-content-center align-item-center  mt-3">
                    <img 
                        onClick={() => handleClick('https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')} 
                        src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                        className="small-image rounded-4"  />
                    <img 
                        onClick={() => handleClick('https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg')} 
                        src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg" 
                        className="small-image rounded-4"  />
                    <img 
                        onClick={() => handleClick('https://evoke.ie/wp-content/uploads/2023/03/332748275_873194020580069_1419245163461513321_n.jpg')} 
                        src="https://evoke.ie/wp-content/uploads/2023/03/332748275_873194020580069_1419245163461513321_n.jpg" 
                        className="small-image rounded-4"  />
                </div>
            </div>
            

            <div className="container mt-3 d-flex flex-column justify-content-center align-item-center text-center text-muted" >
                <b>
                <h2 className="font-weight-bold" style={{fontWeight:"900"}}>About Us </h2> 
                </b>

                
                <br />

                <div className="w-100"></div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam explicabo, officiis nisi vel numquam quis reiciendis maxime atque sunt libero dolores accusantium omnis consectetur dignissimos! Temporibus autem qui delectus at.
                </p>
            </div>


            <div className=" mt-3 d-flex flex-column justify-content-center align-item-center text-center text-muted"  >
                <b>
                    <h2 className="font-weight-bold" style={{fontWeight:"900"}}>Contact us </h2> 
                </b>
                <br />
                <div className="w-100"></div>
                
                <div className="mt-3 d-flex flex-row justify-content-center align-item-center col-12 my-2 ">
                    <div className="col-4 d-flex flex-column justify-content-cente  align-item-center">
                        <div className="my-2 text-start">Phone</div>
                        <div className="my-2 text-start">Social Media</div>
                        <div className="my-2 text-start">Address</div>
                    </div>
                    <div className="col-7 d-flex flex-column justify-content-cente  align-item-center px-3" style={{borderLeft:"1px solid gray"}}>
                        <div className="my-2 text-start">{shop.phone}</div>
                        <div className="my-2 text-start">{shop.remark}</div>
                        <div className="my-2 text-start">
                               {shop.address}
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                .shop-name {
                    color:black;
                    font-weght:900;
                }
                .slider-container {
                    width: 100%;
                    margin: 0 auto ;
                  }
                  
                  .slider-images {
                    position: relative;
                    height: 500px;
                    overflow: hidden;
                  }
                  
                  .main-image {
                    width: 100%;
                    height: auto;
                    transition: opacity 1s;
                  }
                  
                  .small-images {
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  
                  .small-image {
                    width: 120px;
                    height: 80px;
                    margin: 0 10px;
                    cursor: pointer;
                  }
                  
                  .small-image:hover {
                    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
                  }
                `}
            </style>

        </>
    );
};

export default ShopView;