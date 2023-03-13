import { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import { QRCode } from "antd";
const AdminQrCode = () => {
    const [shops,setShops] = useState([]);
    const [url,setUrl] = useState('');
    const [qrSize,setQRSize] = useState(350);
    const getShops = async () => {
        const {data} = await axios.post('/api/admin/shops/show'); 
        setShops(data.shops);
    }
    const downloadQRCode = () => {
        const canvas = document.getElementById('QrCode')?.querySelector('canvas');
        if (canvas) {
          const url = canvas.toDataURL();
          const a = document.createElement('a');
          a.download = url+'QRCode.png';
          a.href = url;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      };

    useEffect(() => {
        window.innerWidth < 700 ? setQRSize(200) : setQRSize(350);
        getShops();
    },[])
    return ( 
        <div className="container  shadow-md p-5  " style={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            overflow:"hidden"
            
        }}>
            <Form.Control as="select" custom onChange={(e) => {
                    setUrl(`http://localhost:8000/sh/${e.target.value}`);
                }}>

                {shops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                    {shop.shop_name}
                </option>
                ))}
            </Form.Control>

            {url != '' ? 
                <div className="mt-4 d-flex justify-content-center align-item-center" id="QrCode">
                    <QRCode
                        
                        size={qrSize}
                        errorLevel="H"
                        value={url}
                        // icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    />
                </div>
                :
                <div></div>
            }
            <button onClick={downloadQRCode} style={{float:'right'}} className="btn mt-4 col btn-block btn-primary">
                Download QRCode 
            </button>
        </div>
    )
}


export default AdminQrCode;