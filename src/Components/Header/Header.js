import React from 'react';
import './Header.css';
import logo from '../../images/logo.png';
import { Button, FormControl, Navbar, Nav, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";


const Header = () => {
    return (
      <div className="container-fluid mx-0 px-0">
           <div className="row align-items-center">
               <div className="col-md-12">
                    <Navbar bg="dark" expand="lg">
                        <Navbar.Brand href="#home"><img className="img-fluid logo" src={logo}></img></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto ">
                        <Nav.Link as = {Link}  to ="/Login" className="shop" >Login</Nav.Link>
                        <Nav.Link as = {Link}  to ="/shop" className="shop" >Shop</Nav.Link>
                        <Nav.Link  href="review" className="shop"  >Order review</Nav.Link>
                        <Nav.Link  href="inventory" className="shop3" >Manage Inventory</Nav.Link>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        </Navbar.Collapse>
                    </Navbar>
               </div>
           </div>
      </div>

    );
};

export default Header;