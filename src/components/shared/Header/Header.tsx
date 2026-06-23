import { Badge } from "react-bootstrap"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from "react-router-dom"
import styles from './styles.module.css'
import Basket from "../../ecommerce/Basket/Basket"

const { topHeaderContainer } = styles

const Header = () => {
  return (
    <header>
      <div className={topHeaderContainer}>
        <h1><span>eco</span><Badge>ma</Badge></h1>
        <Basket/>
      </div>

      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about-us">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link href="#home">Login</Nav.Link>
            <Nav.Link href="#link">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header