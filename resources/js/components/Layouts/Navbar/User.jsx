import './User.css'
const  UserNavbar = () => {
    return (
        <> 
            <script src="https://cdn.jsdelivr.net/npm/@mdi/font@7.1.96/scripts/verify.min.js"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.1.96/css/materialdesignicons.min.css" />
            <nav className="navbar navbar-dark shadow-md bg-orange"> 
            
                <div className="container-fluid">
                <span className="navbar-brand mb-0 h1 navbar-title">
                    <span className='navbar-title-index-0'>S</span>
                    <span className='navbar-title-index-other'>HWE MYO TAW</span>
                </span>
                <div className="text-white  search ">
                    <div className="input-group">
                    <div id="search-autocomplete" className="form-outline">
                        <input placeholder='Search....' type="search" id="form1" className="form-control-sm rounded-pill px-md-3" />
                    </div>

                    </div>
                </div>
                
                </div>
                
            </nav>
            
        </>
    )
}

export default UserNavbar;