import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import '../style.css'
// import img1 from '../img/img1.png'
toast.configure();
export default function NavBarComponent(props) {
    const [img, setImg] = useState(()=>"img1.png")
    const Logout = async () => {
        toast.success("Logout Successfully",{position: toast.POSITION.BOTTOM_RIGHT});
    }
    const GetUserImg=async()=>
    {
        const result=await fetch(`http://localhost:5000/personalprofile/${props.User_email}`);
        const data=await result.json()
        // console.log(data)
        if(data.Profile_picture!=="")
        {
            // console.log("Data",data)
            setImg(()=>data.Profile_picture)
        }
    }
    useEffect(()=>{GetUserImg()},[])
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar" sticky="top">
                <Container>
                    <Navbar.Brand >User</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={`/home/${props.User_email}/${props.User_name}`}>Home</Nav.Link>
                            <Nav.Link as={Link} to={`/idea/${props.User_email}/${props.User_name}`}>My Idea</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title={
                                (<>
                                    <h6 style={{ display: "inline-block", marginRight: "10px" }}>
                                        {props.User_name}
                                    </h6>
                                    <img
                                        src={require(`../img/${img}`)}
                                        width="29"
                                        height="29"
                                        className="d-inline-block align-top"
                                        alt="React Bootstrap logo"
                                        style={{borderRadius:"100%" }}
                                    />
                                </>)} id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to={`/profile/${props.User_email}/${props.User_name}`}>Your Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/profile'}>Account</NavDropdown.Item>
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

