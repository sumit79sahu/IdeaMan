import NavBarComponent from "../component/navbar.component"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginationComponent from "../component/pagination.component";
import IdeaLikeComponent from "../component/idealike.component";
import '../style.css'
export default function HomeLayout() {
    const { User_email, User_name } = useParams();
    const [ideaData, SetIdeaData] = useState([])
    const [showperpage,setShowPerPage]=useState(3)
    const [page,setPage]=useState({start:0,end:showperpage})
    const OnPagination=async(start,end)=>
    {
        setPage({start,end})
    }
    const GetUserIdea = async () => {
        const result = await fetch(`http://localhost:5000/allidea`);
        const data = await result.json()
        // console.log(data)
        const a = []
        for (let j = 0; j < data.length; j++) {
            for (let k = 0; k < data[j].PersonalProfile.Ideas.length; k++) {
                a.push({ ...data[j].PersonalProfile.Ideas[k], User_email: data[j].User_email, User_name: data[j].User_name,Profile_id:data[j].PersonalProfile.Profile_id })
            }
        }
        // console.log(a)
        SetIdeaData(a);
    }
    // console.log(ideaData)
    useEffect(() => {
        GetUserIdea()
    }, [])
    return (
        <>
            <NavBarComponent User_email={User_email} User_name={User_name} />
            <div className="home">
                {
                    ideaData.slice(page.start,page.end).map((data) => {
                        return (<>
                            <div style={{ width: "100%" }}>
                                <Card style={{ width: '93rem' }}>
                                    <Card.Body>
                                        <Card.Title>{data.Idea_title}</Card.Title>
                                        <Card.Subtitle as={Link} to={`/user/${User_email}/${User_name}/${data.User_email}`} className="mb-2 text-muted" style={{ textDecoration: "none" }}>{`By ${data.User_name}`}</Card.Subtitle>
                                        <Card.Text>
                                            {
                                                data.Idea_description
                                            }
                                        </Card.Text>
                                        <IdeaLikeComponent likeData={{Profile_id:data.Profile_id ,Idea_id:data.Idea_id}}/>
                                        <Button variant="outline-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
                                            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                                        </svg></Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </>)
                    })
                }
                <PaginationComponent showperpage={showperpage} OnPagination={OnPagination} noofButton={new Array(Math.ceil(ideaData.length /showperpage)).fill("")}/>
            </div>

        </>
    )
}