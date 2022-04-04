import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import NavBarComponent from "../component/navbar.component";
import { Card, Button, Table } from "react-bootstrap"
import '../style.css'
export default function UserLayout() {
    const { User_email, User_name, Another_useremail } = useParams();
    const [state, SetState] = useState({})
    const [img, setImg] = useState("img3.png")
    const [idea,setIdea]=useState([])
    const GetUserData = async () => {
        const result = await fetch(`http://localhost:5000/personalprofile/${Another_useremail}`)
        const data = await result.json()
        console.log(data)
        SetState(data)
        setImg(data.Profile_picture)
        const result1=await fetch(`http://localhost:5000/idea/${data.Profile_id}`)
        const data1=await result1.json()
        setIdea(data1)
    }
    useEffect(() => {
        GetUserData();
    }, [])
    return (
        <>
            <NavBarComponent User_email={User_email} User_name={User_name} />
            <div className="userinformation">
                <Card style={{width:"50rem"}}>
                    <Card.Img variant="top" src={require(`../img/${img}`)} width={100} height={400} />
                    <Card.Header><h2>{state.User_name}</h2></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Email</td>
                                        <td>{state.User_email}</td>
                                    </tr>
                                    <tr>
                                        <td>Contact No</td>
                                        <td>{state.User_mobileno}</td>
                                    </tr>
                                    <tr>
                                        <td>Date of Birth</td>
                                        <td>{state.DateofBirth}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>{state.Gender}</td>
                                    </tr>
                                    <tr>
                                        <td>State</td>
                                        <td>{state.State_name}</td>
                                    </tr>
                                    <tr>
                                        <td>City</td>
                                        <td>{state.City_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Graduation</td>
                                        <td>{state.Degree}</td>
                                    </tr>
                                    <tr>
                                        <td>Specialization</td>
                                        <td>{state.Specialization}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Card.Header><h4>Idea</h4></Card.Header>
                            {/* <h4>Idea</h4> */}
                            <Table>
                                <tbody>
                                    {
                                        idea.map((data)=>
                                        {
                                            return(
                                                <>
                                                    <tr>
                                                        <td>
                                                            {data.Idea_title}
                                                        </td>
                                                        <td>
                                                            {data.Idea_description}
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}