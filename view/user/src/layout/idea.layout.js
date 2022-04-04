import { useEffect, useState} from "react";
import { Form, Button, Table } from "react-bootstrap";
import { useParams } from "react-router-dom"
import NavBarComponent from "../component/navbar.component";
import EditIdeaComponent from "../component/editidea.component";
export default function IdeaLayout() {
    const { User_email, User_name } = useParams();
    const [id,SetCategoryId]=useState(0)
    const [categoryData,SetCategoryData]=useState([])
    const [subcategoryData, SetSubcategoryData] = useState([{Subcategory_name:"",Subcategory_id:""}])
    const [insertData, SetInsertData] = useState({ Profile_id:"",Idea_title: "", Subcategory_id: "", Idea_description: "" })
    const [ideaData,SetIdeaData]=useState([])
    const GetCategoryData=async()=>
    {
        const result=await fetch('http://localhost:5000/Category')
        const data =await result.json()
        SetCategoryData(data)
    }
    const GetSubcategoryData = async () => {
        if(id!==0)
        {
            const result = await fetch(`http://localhost:5000/subcategory/${id}`);
            const data = await result.json()
                SetSubcategoryData(data)
        }
        else
        {
            alert("Please select category");
        }
    }
    const GetCategoryId=async(e)=>
    {
        const value=e.target.value
        SetCategoryId(value)
    }
    const GetUserIdeaFormData=async(e)=>
    {
        const result = await fetch(`http://localhost:5000/personalprofile/${User_email}`);
        const data = await result.json()
        const a={...insertData,Profile_id:data.Profile_id}
        const name=e.target.getAttribute('name')
        const value=e.target.value
        a[name]=value
        SetInsertData(a)
    }
    const InsertUserIdeaData=async(e)=>
    {
        e.preventDefault();
        await fetch('http://localhost:5000/idea', {
            method: 'Post', headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(insertData)
        })
        e.target.reset()
        GetUserIdeaData()
    }
    const GetUserIdeaData=async()=>
    {
        // e.preventDefault();
        const result1 = await fetch(`http://localhost:5000/personalprofile/${User_email}`);
        const data1 = await result1.json()
        const result=await fetch(`http://localhost:5000/idea/${data1.Profile_id}`)
        const data=await result.json()
        // console.log()
        SetIdeaData(data)
        // SetShowSubCategoryData(a)
    }
    const DeleteUserIdeaData=async(id)=>
    {
        alert("Deleted");
        const result = await fetch(`http://localhost:5000/idea/${id}`, { method: 'Delete' });
        // await console.log(result)
        GetUserIdeaData()
    }
    useEffect(()=>{GetUserIdeaData();GetCategoryData();},[])
    return (
        <>
            <NavBarComponent User_email={User_email} User_name={User_name} />
            <div className="idea">
                <div className="ideaitem">
                    <Form onSubmit={InsertUserIdeaData}>
                    <Form.Group className="mb-3" controlId="formGroupCategoryId" >
                            <label for="Category">Select Category</label>
                            <br />
                            
                            <select id="Category" name="Category_id" required onChange={GetCategoryId} >
                                <option value={null}>Select Category</option>
                                {   
                                    categoryData.map((Data) => {
                                        return (<>
                                            <option value={Data.Category_id}>{Data.Category_name}</option>
                                        </>)
                                    })
                                }
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupSubcategoryId" >
                            <label for="Subcategory">Select SubCategory</label>
                            <br />
                            <select id="Subcategory" name="Subcategory_id" required onClick={GetSubcategoryData}  onChange={GetUserIdeaFormData} >
                                <option value={null}>Select Subcategory</option>
                                {
                                      subcategoryData.map((Data) => {
                                        return (<>
                                            <option value={Data.Subcategory_id}>{Data.Subcategory_name}</option>
                                        </>)
                                    })
                                }
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupIdeaTitle" >
                            <label for="name">Idea Title</label>
                            <br />
                            <input type="text" id="name" placeholder="Idea Title" name="Idea_title" required  onChange={GetUserIdeaFormData}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupIdeaDescription">
                            <label for="state description">Tell us something about your Idea</label>
                            <br />
                            <textarea id="Idea description" placeholder="Idea Description" rows="4" cols="30" name='Idea_description' onChange={GetUserIdeaFormData}></textarea>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className="ideaitem">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Idea Title</th>
                                <th>Idea Description</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ideaData.map((data) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{data.Idea_title}</td>
                                                <td>{data.Idea_description}</td>
                                                <td><Button onClick={()=>{DeleteUserIdeaData(data.Idea_id)}} variant="danger" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                </svg></Button></td>
                                                <td>
                                                    <EditIdeaComponent id={data.Idea_id} GetUserIdeaData={GetUserIdeaData}/>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}
