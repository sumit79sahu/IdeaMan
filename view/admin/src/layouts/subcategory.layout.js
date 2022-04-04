import NavBarComponent from "../components/navbar.component"
import { useEffect, useState } from 'react';
import { Form, Table, Button} from 'react-bootstrap';
// import EditSubcategoryData from '../components/editSubcategoryData.component';
import EditSubcategoryData from '../components/editSubcategoryDate.component'
import '../style.css';
export default function SubcategoryLayout(props)
{
    const [categoryDate,setCategoryData]=useState([])
    const [showData, setShowData] = useState([])
    const [insertData, setInsertData] = useState({Category_id:"",Subcategory_name: "" ,Subcategory_icon: "", Subcategory_description: "" })
    // const [deleteData,setDeleteData]=usesubcategory(0)
    const GetCategoryData = async () => {
        const result = await fetch('http://localhost:5000/category');
        const s = await result.json()
        setCategoryData(s);
    }
    const GetSubcategoryData = async () => {
        const result = await fetch('http://localhost:5000/subcategory');
        const s = await result.json()
        setShowData(s);
    }
    const InsertSubcategoryData = async (e) => {
        e.preventDefault()
        console.log(insertData)
        const result = await fetch('http://localhost:5000/subcategory', {
            method: 'Post', headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(insertData)
        })
        await console.log(result)
        e.target.reset()
        GetSubcategoryData();
    }
    const GetSubcategoryFormData = async (e) => {
        e.preventDefault();
        const s = { ...insertData }
        const name1 = e.target.getAttribute('name');
        if (name1 === "Subcategory_icon") {
            const value = e.target.files[0]
            s[name1] = value.name
            console.log(s[name1])
            setInsertData(s)
        }
        else {
            const value = e.target.value
            s[name1] = value
            console.log(name1+":"+value);
            setInsertData(s)
        }
        // console.log(name)
        // console.log(value)

    }
    const DeleteSubcategoryData = async (id) => {
        alert("Deleted");
        const result = await fetch(`http://localhost:5000/subcategory/${id}`, { method: 'Delete' });
        await console.log(result)
        GetSubcategoryData()
    }

    useEffect(() => {
        GetSubcategoryData()
    }, []);
    return (
        <>
        <NavBarComponent heading={props.heading}/>
            <div className="subcategory">
                <div className='subcategoryitem'>
                    <Form onSubmit={InsertSubcategoryData}>
                    <Form.Group className="mb-3" controlId="formGroupcategoryid" >
                    <label for="Categoryname">Select Category Name</label>
                    <br/>
                    <select id="Categoryname" name="Category_id" onChange={GetSubcategoryFormData} required onClick={GetCategoryData}>
                        <option value={null}>Select Category</option>
                        {
                            categoryDate.map((Data)=>{return(<>
                                <option value={Data.Category_id}>{Data.Category_name}</option>
                            </>)})
                        }
                    </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupsubcategoryName" >
                            <label for="name">Subcategory Name</label>
                            <br />
                            <input type="text" id="name" placeholder="Subcategory Name" name="Subcategory_name"  required onChange={GetSubcategoryFormData} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupsubcategoryImage">
                            <label for="icon">Subcategory Image</label>
                            <br />
                            <input type="file" id='icon' name="Subcategory_icon" onChange={GetSubcategoryFormData} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupsubcategorydescription">
                            <label for="subcategory description">Tell us something about your subcategory</label>
                            <br />
                            <textarea id="subcategory description" placeholder="Subcategory Description" rows="4" cols="30" name='Subcategory_description' onChange={GetSubcategoryFormData}></textarea>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className='subcategoryitem'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Subcategory Name</th>
                                <th>Subcategory Image</th>
                                <th>Subcategory Description</th>
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
                                                <td>{data.Subcategory_name}</td>
                                                <td><img src={require(`../img/${data.Subcategory_icon}`)} height={50} width={50}/></td>
                                                <td>{data.Subcategory_description}</td>
                                                <td><Button variant="danger" onClick={() => { DeleteSubcategoryData(data.Subcategory_id) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                </svg></Button></td>
                                                <td>
                                                    <EditSubcategoryData subcategoryId={data.Subcategory_id} GetSubcategoryData={GetSubcategoryData}/>
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