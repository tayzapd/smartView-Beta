import { useState } from "react";
import { useParams } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';

import './Dashboard.css'
const Dashboard = () => {
    const {name} = useParams();
    const [navOpen,setNavOpen] = useState(false);
    return (
        <div>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

                

                <Navbar style={{ background: 'linear-gradient(90deg, rgba(254,133,0,1) 0%, rgba(254,165,0,1) 48%, rgba(254,133,0,1) 100%)'}} className="px-5 shadow-lg navbar-dark">
                    <Container fluid>
                        <Navbar.Brand  href="#">SmartView</Navbar.Brand>
                        <Navbar.Offcanvas
                        placement="end"
                        >

                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <div className="float-right"> 
                                    <a 
                                        onClick={() => {
                                            setNavOpen(!navOpen)
                                        }}
                                        className="button-left">
                                            <span className="fa fa-fw fa-bars "></span>
                                    </a> 
                                </div>    
                            </Nav>
                        </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
                <div className="main">
                    <aside>
                        
                    <div className={navOpen ? "sidebar fliph left" : "sidebar"}>
                        <div className="user-panel">
                        <div className="pull-left image">
                            <img src="http://via.placeholder.com/160x160" className="rounded-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>Digital Support</p>
                            <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                        </div>
                        </div>
                        <ul className="list-sidebar bg-defoult">
                        <li> <a href="#" data-toggle="collapse" data-target="#dashboard" className="collapsed active" > <i className="fa fa-th-large"></i> <span className="nav-label"> Dashboards </span> <span className="fa fa-chevron-left pull-right"></span> </a>
                        <ul className="sub-menu collapse" id="dashboard">
                            <li className="active"><a href="#">CSS3 Animation</a></li>
                            <li><a href="#">General</a></li>
                            <li><a href="#">Buttons</a></li>
                            <li><a href="#">Tabs & Accordions</a></li>
                            <li><a href="#">Typography</a></li>
                            <li><a href="#">FontAwesome</a></li>
                            <li><a href="#">Slider</a></li>
                            <li><a href="#">Panels</a></li>
                            <li><a href="#">Widgets</a></li>
                            <li><a href="#">Bootstrap Model</a></li>
                        </ul>
                        </li>

                    <li> 
                        <a href="#" data-toggle="collapse" data-target="#e-commerce" className="collapsed active" ><i className="fa fa-shopping-cart"></i> <span className="nav-label">E-commerce</span><span className="fa fa-chevron-left pull-right"></span></a>
                    </li>
               
                </ul>
                </div>
                </aside>
                
                </div>
        </div>
    )
}

export default Dashboard;