import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

function ShopNavbar() {
  const router = useNavigate();
  return (
    <>
        <Navbar style={{ background: 'linear-gradient(90deg, rgba(254,133,0,1) 0%, rgba(254,165,0,1) 48%, rgba(254,133,0,1) 100%)'}} expand='sm' className="mb-3 px-5 shadow-lg navbar-dark">
          <Container fluid>
            <Navbar.Brand  href="#">SmartView</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-sm`}
              aria-labelledby="offcanvasNavbarLabel-expand-sm"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link onClick={() => {router('/')}}>Home</Nav.Link>
                  <Nav.Link onClick={() => {router('users')}}>users</Nav.Link>
                  <Nav.Link onClick={() => {router('items')}}>items</Nav.Link>
                  <Nav.Link onClick={() => {router('category')}}>category</Nav.Link>
                </Nav>

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default ShopNavbar;