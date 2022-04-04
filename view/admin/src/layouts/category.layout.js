import { useEffect, useState } from 'react';
import { Form, Table, Button} from 'react-bootstrap';
import EditCategoryData from '../components/editCategoryData.component';
import NavBarComponent from '../components/navbar.component';
import '../style.css';
export default function CategoryLayout(props) {
    const [showData, setShowData] = useState([])
    const [insertData, setInsertData] = useState({ Category_name: "", Category_icon: "", Category_description: "" })
    // const [deleteData,setDeleteData]=useState(0)
    const GetCategoryData = async () => {
        const result = await fetch('http://localhost:5000/category');
        const s = await result.json()
        setShowData(s);
    }
    const InsertCategoryData = async (e) => {
        e.preventDefault()
        console.log(insertData)
        const result = await fetch('http://localhost:5000/category', {
            method: 'Post', headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(insertData)
        })
        await console.log(result)
        e.target.reset();
        GetCategoryData();
    }
    const GetCategoryFormData = async (e) => {
        e.preventDefault();
        const s = { ...insertData }
        const name1 = e.target.getAttribute('name');
        if (name1 === "Category_icon") {
            const value = e.target.files[0]
            s[name1] = value.name
            console.log(s[name1])
            setInsertData(s)
        }
        else {
            const value = e.target.value
            s[name1] = value
            console.log(s[name1])
            setInsertData(s)
        }
        // console.log(name)
        // console.log(value)

    }
    const DeleteCategoryData = async (id) => {
        alert("Deleted");
        const result = await fetch(`http://localhost:5000/category/${id}`, { method: 'Delete' });
        await console.log(result)
        GetCategoryData()
    }

    useEffect(() => {
        GetCategoryData()
    }, []);
    return (
        <>
        <NavBarComponent heading={props.heading}/>
            <div className="category">
                <div className='categoryitem'>
                    <Form onSubmit={InsertCategoryData}>
                        <Form.Group className="mb-3" controlId="formGroupCategoryName" >
                            <label for="name">Category Name</label>
                            <br />
                            <input type="text" id="name" placeholder="Category Name" name="Category_name" required onChange={GetCategoryFormData} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupCategoryImage">
                            <label for="icon">Category Image</label>
                            <br />
                            <input type="file" id='icon' name="Category_icon" onChange={GetCategoryFormData} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupCategoryImage">
                            <label for="category description">Tell us something about your category</label>
                            <br />
                            <textarea id="category description" placeholder="Category Description" rows="4" cols="30" name='Category_description' onChange={GetCategoryFormData}></textarea>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className='categoryitem'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Category Image</th>
                                <th>Category Description</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                showData.map((data) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{data.Category_name}</td>
                                                <td><img src={require(`../img/${data.Category_icon}`)} height={50} width={50}/></td>
                                                <td>{data.Category_description}</td>
                                                <td><Button variant="danger" onClick={() => { DeleteCategoryData(data.Category_id) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                </svg></Button></td>
                                                <td>
                                                    <EditCategoryData categoryId={data.Category_id}  GetCategoryData={GetCategoryData}/>
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