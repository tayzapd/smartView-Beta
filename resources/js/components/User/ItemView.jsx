
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card,Button } from "antd";
const { Meta } = Card;

import './css/itemView.css'
const ItemView = () => {
    const {id} = useParams();
    const [items,setItems] = useState([]);
    const [shop,setShop] = useState([]);
    const [loading,setLoading]  = useState(true);

    const stopLoading = () => {
        setLoading(false)
    }
    
    const getItems = () => {
        axios.post('/api/user/shop/items/',{id:id}).then((res) => {
            setItems(res.data.items);
        })
    }

    const getShopInfo = () => {
        axios.post('/api/user/shop/info/',{id:id}).then((res) => {
            setShop(res.data.shop);
        })
    }
    useEffect(() => {
        getItems();
        getShopInfo();
        setTimeout(stopLoading,3000)
    },[])

    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.7.55/css/materialdesignicons.min.css" />
        <div className="container-fluid py-3 ">
            <style>
                {`
                .card-img {
                    height: 200px;
                    width: 300;
                    border:0;
                    object-fit: cover;
                  }
                  
                  @media (max-width: 767px) {
                    .card-img {
                      height: 300;
                      width: 300;
                      object-fit: cover;
                    }
                  }
                  
                `}
            </style>
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
                                }}>View More</Button>
                            </Card>
                        
                })}
            </div>
            </div>
        </>
    )
}


export default ItemView;