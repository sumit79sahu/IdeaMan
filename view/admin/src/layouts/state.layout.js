import { useEffect, useState } from 'react';
import { Form, Table, Button} from 'react-bootstrap';
import EditStateData from '../components/editStateData.component';
import NavBarComponent from '../components/navbar.component';
import '../style.css';
export default function StateLayout(props) {
    const [showData, setShowData] = useState([])
    const [insertData, setInsertData] = useState({ State_name: "", State_icon: "", State_description: "" })
    const GetStateData = async () => {
        const result = await fetch('http://localhost:5000/state');
        const s = await result.json()
        console.log(s)
        setShowData(s);
    }
    const InsertStateData = async (e) => {
        e.preventDefault()
        console.log(insertData)
        const result = await fetch('http://localhost:5000/state', {
            method: 'Post', headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(insertData)
        })
        await console.log(result)
        e.target.reset();
        GetStateData();
    }
    const GetStateFormData = async (e) => {
        e.preventDefault();
        const s = { ...insertData }
        const name1 = e.target.getAttribute('name');
        if (name1 === "State_icon") {
            console.log(e.target.files)
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
    const DeleteStateData = async (id) => {
        alert("Deleted");
        const result = await fetch(`http://localhost:5000/state/${id}`, { method: 'Delete' });
        await console.log(result)
        GetStateData()
    }

    useEffect(() => {
        GetStateData()
    }, []);
    return (
        <>
        <NavBarComponent heading={props.heading}/>
            <div className="state">
                <div className='stateitem'>
                    <Form onSubmit={InsertStateData}>
                        <Form.Group className="mb-3" controlId="formGroupStateName" >
                            <label for="name">State Name</label>
                            <br />
                            <input type="text" id="name" placeholder="State Name" name="State_name" required onChange={GetStateFormData} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupStateImage">
                            <label for="icon">State Image</label>
                            <br />
                            <input type="file" id='icon' name="State_icon" onChange={GetStateFormData} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupStateDescription">
                            <label for="state description">Tell us something about your state</label>
                            <br />
                            <textarea id="state description" placeholder="State Description" rows="4" cols="30" name='State_description' onChange={GetStateFormData}></textarea>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className='stateitem'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>State Name</th>
                                <th>State Image</th>
                                <th>State Description</th>
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
                                                <td>{data.State_name}</td>
                                                <td><img src={require(`../img/${data.State_icon}`)} height={50} width={50}/></td>
                                                <td>{data.State_description}</td>
                                                <td><Button variant="danger" onClick={() => { DeleteStateData(data.State_id) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                </svg></Button></td>
                                                <td>
                                                    <EditStateData stateId={data.State_id} GetStateData={GetStateData}/>
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