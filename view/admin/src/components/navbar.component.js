import { Nav, Navbar, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import img9 from "../img/img9.png"
import { NavDropdown } from 'react-bootstrap'
toast.configure();
const NavBarComponent = (props) => {
    const Logout = async () => {
        toast.success("Logout Successfully");
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><h2>Admin</h2></Navbar.Brand>
                    <Navbar.Brand>{props.heading}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/Dashboard"}>Dashboard</Nav.Link>
                            <Nav.Link as={Link} to={"/state"}>State</Nav.Link>
                            <Nav.Link as={Link} to={"/city"}>City</Nav.Link>
                            <Nav.Link as={Link} to={"/category"}>Category</Nav.Link>
                            <Nav.Link as={Link} to={"/subcategory"}>Subcategory</Nav.Link>
                            <Nav.Link as={Link} to={"/users"}>Users</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title={(<img
                                src={img9}
                                width="25"
                                height="25"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />)} id="basic-nav-dropdown">
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to={'/'} onClick={Logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavBarComponent;
