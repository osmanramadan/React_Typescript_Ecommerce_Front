import { Badge, Dropdown, NavDropdown } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
import HeaderContainer from './HeaderContainer/HeaderContainer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { authLogout } from '@/store/auth/authSlice'

const { topHeaderContainer } = styles


const Header = () => {
    const {user,accessToken} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

  return (
    <header>
      <div className={topHeaderContainer}>
        <h1>
          <span>eco</span>
          <Badge>ma</Badge>
        </h1>
        <HeaderContainer />
      </div>

      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about-us">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/categories">
              Categories
            </Nav.Link>
          </Nav>

          {
           ! accessToken ? <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Register</Nav.Link>
          </Nav>:
            <Nav>
              <NavDropdown title={`${user?.firstName || ''} اهلا`} align="end">
              <NavDropdown.Item as={NavLink} to="/profile" >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/orders">
                Orders
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  onClick={()=>dispatch(authLogout())}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            </Nav>

          }

        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header
