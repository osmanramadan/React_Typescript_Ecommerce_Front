import { Badge} from "react-bootstrap"

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './styles.module.css'
import Basket from "../../ecom/Basket/Basket";

const {TopHeaderContainer} = styles

const Header = ()=>{
   return (
       <header>

          <div className={TopHeaderContainer}>

               <h1><span >eco </span><Badge>ma</Badge></h1>
               <Basket/>
              
          </div>

         
          

        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
          <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto" >
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Store</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

         <Nav>
            <Nav.Link href="#home">login</Nav.Link>
            <Nav.Link href="#link">register</Nav.Link>
        </Nav> 
        </Navbar.Collapse>
       </Navbar>

      </header>
   )
}

export default Header
