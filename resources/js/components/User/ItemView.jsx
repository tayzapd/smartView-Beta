
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card,Button,Carousel } from "antd";
import { Modal } from "react-bootstrap";
import { useUserContext } from "../../Context/UserContext";
const { Meta } = Card;
import { ArrowDownOutlined } from "@ant-design/icons";
import './css/itemView.css';


const ItemView = () => {
    const {setDialog,grid,items,setItems} = useUserContext()
    const {id} = useParams();
    const [shop,setShop] = useState([]);
    const [loading,setLoading]  = useState(true);
    const [showItem,setShowItem] = useState(false);
    const [currentImage, setCurrentImage] = useState('https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg');
    const [itemImages,setItemImages] = useState([]);

    const [viewItem,setViewItem]  = useState({
        name:"",
        price:"",
        is_available:"",
        privacy:"",
        tag:"",
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

    const handleClick = (newImage) => {
        setCurrentImage(newImage);
    }

    useEffect(() => {
        getItems();
        getShopInfo();
        setTimeout(stopLoading,3000);
    
    },[])

    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.7.55/css/materialdesignicons.min.css" />
        <div className="container-fluid py-3 " style={{
            background:"#fcffa3",
            overflow:"hidden"
        }}>
            
            <style>
                {`
                .card-img {
                    height: 250;
                    width: 300;
                    border:0;
                    object-fit: cover;
                  }
                  
                  @media (max-width: 767px) {
                    .card-img {
                      height: 250;
                      width: 300;
                      object-fit: cover;
                    }
                  }
                  
                `}
            </style>

            {/* ITEM ONE PAGE VIEW   */}
            <Modal show={showItem} onHide={() => {setShowItem(false);setDialog(false); } } fullscreen>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body >
                    <div className="slider-container">
                    <img src={currentImage} className="main-image rounded-4 " />
                    <div className="d-flex flex-row justify-content-center align-item-center  mt-3">
                            {itemImages[1] ? 
                                <img 
                                onClick={() => handleClick('https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')} 
                                src={'/images/shop/item/'+itemImages[1]}
                                className="small-image rounded-4"  />
                                :
                                <span></span> 
                            }
                            {itemImages[2] ? 
                                <img 
                                onClick={() => handleClick('https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg')} 
                                src={'/images/shop/item/'+itemImages[1]}
                                className="small-image rounded-4"  />
                                :
                                <span></span>
                            }
                            {itemImages[3] ? 
                                <img 
                                onClick={() => handleClick('https://evoke.ie/wp-content/uploads/2023/03/332748275_873194020580069_1419245163461513321_n.jpg')} 
                                src={'/images/shop/item/'+itemImages[1]}
                                className="small-image rounded-4"  />
                                : 
                                <span></span>
                            }
                        </div>
                    </div>
            

                    <div className="container mt-3 d-flex flex-column justify-content-center align-item-center text-center " >
                        <b>
                            <h2 className="font-weight-bold" style={{fontWeight:"900"}}>{viewItem.name}  </h2> 
                        </b>

                        <b>
                            <h2 className="font-weight-bold text-muted" style={{fontWeight:"900"}}>{viewItem.category.name}  </h2> 
                        </b>

                        <b>
                            <h2 className="font-weight-bold text-warning" style={{fontWeight:"900"}}>{viewItem.price} MMK </h2> 
                        </b>

                    </div>


                    <div className="container-fluid mt-3 d-flex flex-column justify-content-startt align-item-start text-start text-muted"  style={{fontWeight:"900"}} >
                        <b>
                        <h2 className="font-weight-bold" >Description </h2> 
                        </b>

                        
                        <br />

                        <div className="w-100"></div>
                        <p style={{marginLeft:'12px'}}>
                            {viewItem.description}
                        </p>

                        <b>
                        <h2 className="font-weight-bold" >Tags </h2> 

                        <div style={{marginleft:'12px'}} >
                            <span className="rounded-2 px-2 py-1 mx-2" style={{background:'#d4fcff'}}>Fish</span>
                            <span className="rounded-2 px-2 py-1 mx-2" style={{background:'#d4fcff'}}>Rice Noodle</span>
                            <span className="rounded-2 px-2 py-1 mx-2" style={{background:'#d4fcff'}}>Spicy</span>
                        </div>

                        </b>


                    </div>
                    
                </Modal.Body>
            </Modal>
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
            <div className="col-12 d-flex justify-content-center">
            {
                grid == true ? 
                <>
                    <div className="d-flex flex-column justify-content-center align-item-center">
                    {
                        items.map((item,id) => {
                            return <div key={id} 
                                        className="card mx-0 mx-lg-3 mb-sm-3 col-12 col-md-3 my-1 rounded-4 " 
                                        onClick={() => {
                                            ShowOneItem(id)
                                            setItemImages(item.images)
                                            setCurrentImage(`/images/shop/item/`+item.images[0])
                                        }}>
                                    <div className="row no-gutters">
                                        <div className="col-6 px-2 py-2">
                                            <img style={{height:'130px',marginLeft:'10px'}} className="card-img rounded-4 col-12 " src={`/images/shop/item/`+item.images[0]} />
                                        </div>
                                        <div className="col-6">
                                            <div className="card-body py-2 px-2 mr-2 text-center">
                                                <h6 style={{fontSize:"20px",fontWeight:'900'}} className="col-12 mt-2 ">{item.name}</h6>
                                                <p className="card-title ">{item.category.name}</p>
    
                                                <div className="text-warning" style={{marginTop:'30px'}}>
                                                    {item.price} MMK 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        })
                    }
                    </div>
                </>
                :
                <>
                    <div className="row d-flex  align-item-center " style={{padding:"0 10px "}}>
                    {
                        items.map((item,id) => {
                            return <div className="card col-5 mx-1 my-2 rounded-3 pt-2" 
                                    onClick={() => {
                                        ShowOneItem(id)
                                        setItemImages(item.images)
                                        setCurrentImage(`/images/shop/item/`+item.images[0])
                                    }}
                                    style={{width:'190px'}}
                                    key={id} >
                                        <img style={{height:'130px'}} className="card-img-top rounded-3 col-12 " src={`/images/shop/item/`+item.images[0]} />
                                        <div className="card-body text-center ">
                                            <div style={{fontSize:"15px",fontWeight:'900'}} className="col-12 ">{item.name}</div>
                                            <p className="font-weight-bold">{item.category.name}</p>

                                            <div className="text-warning" style={{marginTop:'5px'}}>
                                                {item.price} MMK 
                                            </div>
                                        </div>
                                    </div>
                        })
                    }
                    </div>
                </>
            }
            </div>

            </div>
            
        </>

    )
}


export default ItemView;