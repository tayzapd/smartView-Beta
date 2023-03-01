
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import './css/itemView.css'
const ItemView = () => {
    const {id} = useParams();
    const [items,setItems] = useState([]);
    const getItems = () => {
        axios.post('/api/user/shop/items/',{id:id}).then((res) => {
            setItems(res.data.items);
        })
    }
    useEffect(() => {
        getItems();
    
    },[])
    return (
        <>
        <div className="container-fluid py-3 ">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 px-0">
                {items.map((item) => {
                    return <> 
                       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.7.55/css/materialdesignicons.min.css" />
                    
                            <div className="col mb-4" key={item}>
    
                                <div className="card border-0 ">
                                    <div className="d-flex flex-row ">
                                        <div className="col-4">
                                            <img src={`images/shop/logo/`+item.images} className="img-thumbnail rounded float-left border-0 rounded-0 " />
                                        </div>
                                        <div className="col-8 px-5 px-lg-4 px-sm-5 py-3">
                                            <div className="d-flex flex-row ">
                                                <div className="col-8 asfdme">
                                                {item.name}
                                                </div>
                                                
                                                <div className="col-4 redirect-arrow ">
                                                <i className="mdi mdi-arrow-right"></i>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row ">
                                                <div className="price col-4 rounded-pill">
                                                    $ {item.price}
                                                </div>

                                                <div className="col-4 mx-2 rounded-pill">
                                                    {item.category.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </> 
                })}
                
            </div>
            </div>
        </>
    )
}


export default ItemView;