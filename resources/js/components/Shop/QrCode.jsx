import { useEffect, useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import { useShopContext } from "../../Context/ShopContext";
import { QRCode } from "antd";
const ShopQRCode =  () => {
    const {token,setUsers,axios} = useShopContext();
    const {id} = useParams();
    const [url,setUrl] = useState(`http://localhost:8000/sh/${id}`);
    const [qrSize,setQRSize] = useState(350);
    const [user,setUser] = useState({});
    const downloadQRCode = () => {
        const canvas = document.getElementById('QrCode')?.querySelector('canvas');
        if (canvas) {
          const url = canvas.toDataURL();
          const a = document.createElement('a');
          a.download = `Shop-${id}-QRCode.png`;
          a.href = url;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      };

    useEffect(() => {
        window.innerWidth < 700 ? setQRSize(200) : setQRSize(350);
        axios.get('/api/user').then(res => {
            setUser(res.data)
            
        })
    },[])

    return (
        <div className="mt-5 d-flex justify-content-center">
             <div className="text-center pt-4 d-flex flex-column justify-content-center align-item-center shadow shadow-md col-md-6 col-12">
                <h3 className="d-flex justify-content-center align-item ">
                    My QRCode 
                </h3>

                <div id="QrCode" className=" d-flex justify-content-center align-item ">
                    {
                        user.shop ? 
                        <QRCode
                        size={qrSize}
                        errorLevel="H"
                        value={url}
                        icon={`/images/shop/logo/`+user.shop.logo_image}
                        />
                        :
                        <span></span>
                    }

                </div>
                <br />

                <button onClick={downloadQRCode} className="btn btn-block btn-primary rounded-0 ">
                    Download
                </button>
             </div>
             
        </div>
    )
}

export default ShopQRCode;