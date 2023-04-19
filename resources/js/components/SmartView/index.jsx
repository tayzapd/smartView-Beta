
import './css/style.css';
import './css/animate.min.css';

const SmartView = () => { 
    return (
        <>
        {/* Css */}
           <>
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"/>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" ></script>
            <script src="https://unpkg.com/scrollreveal"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" ></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" ></script>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Sans"/>
  
           </>
            {/* Body */}
           <>
           <nav class="d-flex flex-row col-10 px-4 pt-md-2  nav-bar mb-md-5 animate__animated animate__bounce"  >
                <h4 class="col-6 justify-content-center d-flex smartview-page-header animate__animated animate__delay-1s animate__jackInTheBox" >
                    <span style={{color: "rgba(254,133,0,1)"}}>SMART</span>
                    VIEW
                </h4>

        
                <div class="col-6 d-flex flex-column flex-md-row justify-content-center" style={{textAlign: "right"}}> 
                    <span class="mx-2 col-12 col-md-5 row" style={{color:"rgba(254,133,0,1)",textAlign: "left"}}>
                        <i class="material-icons col-1">phone</i>
                        <span class="col-9 mx-md-1 contact-text">+9509212483</span>
                    </span>
                    <span class="mx-2 col-12 col-md-5 row" style={{color:"rgba(254,133,0,1)"}}>
                        <i class="material-icons col-1">email</i>
                        <span class="col-9 mx-md-1 contact-text">support@xyberplanet.com</span>
                    </span>
                </div>
            </nav>

            <section class="d-flex flex-md-row flex-column  body-section d-flex justify-content-center"  >
                <div class="col-12 col-md-6 pt-md-5 pr-4 text-section" style={{paddingLeft:"3rem"}}>
                    <h1 style={{fontWeight: "900",fontSize:"2.5rem"}} >
                        <b>
                            <span id="text">
                                You are using
                            </span><br/>
                            <span id="text-2">
                                <span style={{color: "rgba(254,133,0,1)"}}>SMART-</span>VIEW.
                            </span>
                        </b>
                    </h1>
                    <span class="text-muted">
                        Sipsum  sit amet consectetur eligendi obcaecati. <br />
                        exercitationem aliquid blanditiis dolor, <br />
                        quaerat  repellat sed numquam illum . 
                    </span>
                    <br />
                    <button type="submit" class=" get-start-btn px-3 py-2 rounded-5 animate__animated animate__delay-1s animate__swing " >
                        GET START
                    </button>
                </div>
                <div class="col-12 col-md-5 office-logo animate__animated animate__delay-2s animate__rubberBand">
                </div>
            </section>
            <div class="custom-shape-divider-bottom">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fillOpacity="1" d="M0,128L60,122.7C120,117,240,107,360,133.3C480,160,600,224,720,234.7C840,245,960,203,1080,186.7C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            
            </div>
           </>
        </>
    )
}


export default SmartView;