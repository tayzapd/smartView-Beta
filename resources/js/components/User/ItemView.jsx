
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ItemView = () => {
    const {id} = useParams();
    const [items,setItems] = useState();
    useEffect(() => {
        axios.post('/api/user/shop/items/').then((res) => {
            setItems(res.data);
        })
    })
    return (
        <>
        <div className="container-fluid py-3 ">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                {[1,2,3,4,5].map(num => {
                    return <div className="col mb-4" key={num}>
                    <div className="card border-0 border-top">
                        <div className="d-flex flex-row ">
                            <div className="col-4">
                            <img src="https://www.rush.edu/sites/default/files/media-images/Coffee_OpenGraph.png" className="item-image rounded float-left border-0 rounded-0" />
                            </div>
                            <div className="col-8 px-5 px-lg-4 px-sm-5 pt-1">
                                        Hello
                                <div className="text-muted">
                                    Lorem ipsum dolor s
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                })}
                
            </div>
            </div>
        </>
    )
}


export default ItemView;