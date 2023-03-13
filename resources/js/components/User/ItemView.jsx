
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card,Button,Modal,Carousel } from "antd";
import { useUserContext } from "../../Context/UserContext";
const { Meta } = Card;

import './css/itemView.css'
const ItemView = () => {
    const {setDialog} = useUserContext()
    const {id} = useParams();
    const [items,setItems] = useState([]);
    const [shop,setShop] = useState([]);
    const [loading,setLoading]  = useState(true);
    const [showItem,setShowItem] = useState(false);
    const [viewItem,setViewItem]  = useState({
        name:"",
        price:"",
        is_available:"",
        privacy:"",
        taste:"",
        images:[],
        time_limited:"",
        special_range:"",
        description:"",
        remark:"",
        created_at:"",
        updated_at:"",
        category:{name:''},
    });


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

    const ShowOneItem  = (index)  => {
        setShowItem(true);
        let item = items[index];
        setViewItem(item);
        setDialog(true);
        console.log(viewItem)
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

            {/* ITEM ONE PAGE VIEW   */}
            <Modal
                width={1000}
                open={showItem}
                okButtonProps={{}}
                onOk={() => {
                  console.log(viewItem)
                  setShowItem(false);
                  setViewItem({});
                  setDialog(false)
                }}
                type
                onCancel={() => {setShowItem(false);setDialog(false)}}

            >

                <div className="shadow-sm  d-flex flex-row h-auto" style={{background:'#ffffff'}}>
                    <div id="d-sm-none" className="col-md-4 h-auto"></div>
                    <div className="col-12 col-md-5 d-block h-100 h-auto">
                        {
                            viewItem.images ?
                                <Carousel
                                    autoplay={true}>
                                    {viewItem.images.map((img,index) => (
                                        <div key={index}>
                                            <img
                                                className="img-thumbnail rounded-0 border-0"
                                                src={`/images/shop/item/`+img}
                                                alt={img} />
                                        </div>
                                    ))}
                                </Carousel>
                                :
                                <span className='col-12 col-md-5'></span>
                        }
                    </div>
                    <div id="d-sm-none" className="col col-md-3 h-auto"></div>
                </div>
   

                <div className="col row d-block  " id="item-content">
                    <div className="col-12 pt-2 font-weight-bold" style={{fontSize:'20px',fontWeight:'bold'}}>
                        {viewItem.name}
                    </div>
                    <div className="text-muted col-12">
                        {
                            viewItem.category ?
                            <span style={{
                                background:'rgba(0,0,0,0.1)',
                                marginTop:'5px',
                                marginLeft:'15px',
                                borderRadius:'20px',
                                padding:'5px'
                            }}>
                               #{viewItem.category.name}
                            </span>
                            :
                            <span>
                                Not Have
                            </span>
                        }

                    <span style={{fontWeight:'bold'}} className='text-warning mx-3'>
                        {viewItem.price} Kyats
                    </span>

                    <span className="text-muted">
                        {viewItem.view} views 
                    </span>
                   </div>


                </div>
                <div className="mt-3 px-3 py-3 ">
                    {
                        viewItem.is_available == 1 ? 
                        <span 
                        style={{
                            background:"yellowgreen"
                        }}
                        className="rounded-pill py-1 px-2 " >Available</span>
                        :
                        <span className="rounded-pill bg-danger py-1 px-2 ">Not Available </span>
                    }
                    <span className="mx-3 ">
                    {viewItem.taste}
                    </span>
                </div>

                <div>
                    <h4>Description</h4>
                    <p>
                        {viewItem.description}
                    </p>
                </div>


            </Modal>
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
                                    ShowOneItem(index)
                                }}>View More</Button>
                        </Card>
                })}
            </div>
            </div>
        </>
    )
}


export default ItemView;