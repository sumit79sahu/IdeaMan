// import ProfileComponent from "../component/profile.component";
import { Nav, Card, Table, Button } from "react-bootstrap"
import { Link } from 'react-scroll'
import '../style.css'
// import img3 from '../img/img3.png'
import NavBarComponent from "../component/navbar.component";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AboutComponent from "../component/about.component";
import EducationComponent from "../component/education.component";
import AlternativeNoComponent from "../component/alternativeno.component";
import AddressComponent from "../component/address.component";
export default function ProfileLayout() {
    const [aboutUpdate, SetAboutUpdate] = useState(false)
    const [ChangeAlternativeNo, SetChangeAlternativeNo] = useState(false)
    const [addressUpdate, SetAddressUpdate] = useState(false)
    const [educationDetailsUpdate, SetEducationDetailsUpdate] = useState(false)
    const { User_email, User_name } = useParams();
    const [userPersonalData, SetUserPersonalData] = useState({})
    const [profilePicture,SetProfilePicture]=useState('img3.png')
    const GetPersonalProfileData = async () => {
        const result = await fetch(`http://localhost:5000/personalprofile/${User_email}`);
        const data = await result.json()
        console.log(data)
        if(data.Profile_picture!=="")
        {
            SetProfilePicture(data.Profile_picture)
        }
        SetUserPersonalData(data)
    }
    useEffect(() => { GetPersonalProfileData() }, [])
    const EditAboutData = async () => {
        SetAboutUpdate(true)
    }
    const CancelEditAboutData = (e) => {
        SetAboutUpdate(false)
    }
    const GetEditAboutData = async (e, data) => {
        // const a={}
        e.preventDefault();
        console.log(data)
        if (userPersonalData.Profile_id !== "") {

            const result = await fetch(`http://localhost:5000/personalprofile/${userPersonalData.Profile_id}`, {
                method: 'Put', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }
        else {
            const result = await fetch(`http://localhost:5000/personalprofile`, {
                method: 'Post', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...data, User_email: userPersonalData.User_email })
            })
        }
        SetAboutUpdate(false)
        GetPersonalProfileData()
    }
    const EditUserEducationData = async () => {
        SetEducationDetailsUpdate(true)
    }
    const CancelEditUserEducationData = (e) => {
        SetEducationDetailsUpdate(false)
    }
    const GetEditUserEducationData = async (e, data) => {
        e.preventDefault();
        console.log(userPersonalData.Profile_id)
        if (userPersonalData.Education_id !== "") {
            // console.log("education",data,userPersonalData.Profile_id)
            const result = await fetch(`http://localhost:5000/education/${userPersonalData.Education_id}`, {
                method: 'Put', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }
        else if (userPersonalData.Profile_id === "" && userPersonalData.Education_id === "") {
            const result1 = await fetch(`http://localhost:5000/personalprofile`, {
                method: 'Post', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ User_email: userPersonalData.User_email })
            })
            const result2 = await fetch(`http://localhost:5000/personalprofile/${userPersonalData.User_email}`)
            const data1 = await result2.json()
            console.log(data1)
            // console.log(result2)
            const result3 = await fetch(`http://localhost:5000/education`, {
                method: 'Post', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...data, Profile_id: data1.Profile_id })
            })
        }
        else {
            const result3 = await fetch(`http://localhost:5000/education`, {
                method: 'Post', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...data, Profile_id: userPersonalData.Profile_id })
            })
        }
        SetEducationDetailsUpdate(false)
        GetPersonalProfileData()

    }
    const EditUserAddressData = async () => {
        SetAddressUpdate(true)
    }
    const CancelEditUserAddressData = async (e) => {
        SetAddressUpdate(false)
    }
    const GetEditUserAddressData = async (e, data) => {
        e.preventDefault();
        if (userPersonalData.Profile_id !== "") {

            const result = await fetch(`http://localhost:5000/personalprofile/${userPersonalData.Profile_id}`, {
                method: 'Put', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }
        else {
            const result = await fetch(`http://localhost:5000/personalprofile`, {
                method: 'Post', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...data, User_email: userPersonalData.User_email })
            })
        }
        SetAddressUpdate(false)
        GetPersonalProfileData()

    }
    const ChangeAlternativeNoData = async (e) => {
        e.preventDefault()
        // console.log(false)
        SetChangeAlternativeNo(true)
        // console.log(ChangeAlternativeNo)
    }
    const GetAlternativeNoData = async (e, data) => {
        e.preventDefault()
        if (userPersonalData.Profile_id !== "") {

            const result = await fetch(`http://localhost:5000/personalprofile/${userPersonalData.Profile_id}`, {
                method: 'Put', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }
        else {
            const result = await fetch(`http://localhost:5000/personalprofile`, {
                method: 'Post', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...data, User_email: userPersonalData.User_email })
            })
        }
        SetChangeAlternativeNo(false)
        GetPersonalProfileData()

    }
    const CancelChangeAlternativeNoData = async (e) => {
        e.preventDefault()
        SetChangeAlternativeNo(false)
    }
    return (
        <>
            <NavBarComponent User_email={User_email} User_name={User_name} />
            <div className="yourprofile">
                <div className="sidebar yourprofileitem1">
                    <div className="sidebaritem1">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                {/* <a href="" eventKey="link-1">About</a> */}
                                <Nav.Link as={Link} to="about" smooth={false} spy={false} eventKey="link-1" style={{ cursor: "pointer" }}>About</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="contactdetailsitem1" smooth={false} spy={false} eventKey="link-2" style={{ cursor: "pointer" }}>Contact Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="addressitem1" smooth={false} spy={false} eventKey="link-3" style={{ cursor: "pointer" }}>Address</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="educationdetails" smooth={false} spy={false} eventKey="link-4" style={{ cursor: "pointer" }}>
                                    Education Details
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
                <div className="yourprofileitem2">
                    <div className="about">
                        <img src={require(`../img/${profilePicture}`)} className="aboutitem1"/>
                        {/* <a href='#'>Edit</a> */}
                        <Card className="aboutitem2">
                            <Card.Header>About</Card.Header>

                            {
                                aboutUpdate === true ? <AboutComponent aboutData={{ User_name: User_name, DateofBirth: userPersonalData.DateofBirth, Gender: userPersonalData.Gender,Profile_picture:userPersonalData.Profile_picture }} CancelEditAboutData={CancelEditAboutData} GetEditAboutData={GetEditAboutData} /> : (
                                    <>
                                        <Card.Body>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td className="mb-2 text-muted">Name</td>
                                                        <td></td>
                                                        <td>{User_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="mb-2 text-muted">Date of Birth</td>
                                                        <td></td>
                                                        <td>
                                                            {
                                                                userPersonalData.DateofBirth
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr></tr>
                                                    <tr></tr>
                                                    <tr>
                                                        <td className="mb-2 text-muted">Gender</td>
                                                        <td></td>
                                                        <td>
                                                            {
                                                                userPersonalData.Gender
                                                            }</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <Button onClick={EditAboutData} variant="outline-success">Edit</Button>{' '}
                                        </Card.Body>
                                    </>
                                )
                            }
                        </Card>
                    </div>
                    <div className="contactdetails">
                        <Card className="contactdetailsitem1">
                            <Card.Header>Contact Details</Card.Header>
                            <Card.Body>
                                <Table>
                                    <tbody>

                                        <tr>
                                            <td className="mb-2 text-muted">Email</td>
                                            <td></td>
                                            <td>{User_email}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td className="mb-2 text-muted">Mobile No</td>
                                            <td></td>
                                            <td>
                                                {
                                                    userPersonalData.User_mobileno
                                                }
                                            </td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        {
                                            ChangeAlternativeNo === true ? <AlternativeNoComponent alternativeno={userPersonalData.User_alternativemobileno} GetAlternativeNoData={GetAlternativeNoData} CancelChangeAlternativeNoData={CancelChangeAlternativeNoData} /> : (
                                                <>
                                                    <tr>
                                                        <td className="mb-2 text-muted">Alternative Mobile No</td>
                                                        <td></td>
                                                        <td>
                                                            {
                                                                userPersonalData.User_alternativemobileno
                                                            }
                                                        </td>
                                                        <td></td>
                                                        <td><a href="" onClick={(e) => ChangeAlternativeNoData(e)}>change number</a></td>
                                                    </tr>
                                                </>
                                            )
                                        }

                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="address">
                        <Card className="addressitem1">
                            <Card.Header>Address</Card.Header>


                            {
                                addressUpdate === true ? <AddressComponent addressData={{ State_name: userPersonalData.State_name, State_id: userPersonalData.State_id, City_name: userPersonalData.City_name, City_id: userPersonalData.City_id, City_pincode: userPersonalData.City_pincode, Address: userPersonalData.Address }} CancelEditUserAddressData={CancelEditUserAddressData} GetEditUserAddressData={GetEditUserAddressData} /> : (<>
                                    <Card.Body>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td className="mb-2 text-muted">State</td>
                                                    <td></td>
                                                    <td>{userPersonalData.State_name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="mb-2 text-muted">City</td>
                                                    <td></td>
                                                    <td>{userPersonalData.City_name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="mb-2 text-muted">Pincode</td>
                                                    <td></td>
                                                    <td>{userPersonalData.City_pincode}</td>
                                                </tr>
                                                <tr>
                                                    <td className="mb-2 text-muted">Address</td>
                                                    <td></td>
                                                    <td>{userPersonalData.Address}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Button onClick={EditUserAddressData} variant="outline-success">Edit</Button>{' '}
                                    </Card.Body>
                                </>)
                            }
                        </Card>
                    </div>
                    <div className="educationdetails">
                        <Card className="educationdetailsitem1">
                            <Card.Header>Education Details</Card.Header>


                            {
                                educationDetailsUpdate == true ? <EducationComponent educationData={{

                                    Class12_schoolname: userPersonalData.Class12_schoolname,
                                    Class10_schoolname: userPersonalData.Class10_schoolname, Class12_percentage: userPersonalData.Class12_percentage, Class10_percentage: userPersonalData.Class10_percentage,
                                    Degree: userPersonalData.Degree, Specialization: userPersonalData.Specialization
                                }} CancelEditUserEducationData={CancelEditUserEducationData} GetEditUserEducationData={GetEditUserEducationData} /> : (<>
                                    <Card.Body>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td className="mb-2 text-muted">Class 12 School Name</td>
                                                    <td>{userPersonalData.Class12_schoolname}</td>
                                                    <td className="mb-2 text-muted">Class 12 Percentage</td>
                                                    <td>{userPersonalData.Class12_percentage}</td>
                                                </tr>
                                                <tr>
                                                    <td className="mb-2 text-muted">Class 10 School Name</td>
                                                    <td>{userPersonalData.Class10_schoolname}</td>
                                                    <td className="mb-2 text-muted">Class 10 Percentage</td>
                                                    <td>{userPersonalData.Class10_percentage}</td>
                                                </tr>
                                                <tr>
                                                    <td className="mb-2 text-muted">Degree</td>
                                                    <td>{userPersonalData.Degree}</td>
                                                    <td className="mb-2 text-muted">Specialization</td>
                                                    <td>{userPersonalData.Specialization}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Button onClick={EditUserEducationData} variant="outline-success">Edit</Button>{' '}
                                    </Card.Body>
                                </>)
                            }


                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}