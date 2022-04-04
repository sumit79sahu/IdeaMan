import NavBarComponent from "../components/navbar.component"
import { useEffect, useState } from 'react';
import { Form, Table, Button} from 'react-bootstrap';
import EditCityData from '../components/editCityData.component';
import '../style.css';
export default function CityLayout(props)
{
    const [stateData,setStateData]=useState([])
    const [showData, setShowData] = useState([])
    const [insertData, setInsertData] = useState({State_id:"",City_name: "",City_pincode:"", City_icon: "", City_description: "" })
    // const [deleteData,setDeleteData]=usecity(0)
    const GetStateData = async () => {
        const result = await fetch('http://localhost:5000/state');
        const s = await result.json()
        setStateData(s);
    }
    const GetCityData = async () => {
        const result = await fetch('http://localhost:5000/city');
        const s = await result.json()
        setShowData(s);
    }
    const InsertCityData = async (e) => {
        e.preventDefault()
        console.log(insertData)
        const result = await fetch('http://localhost:5000/city', {
            method: 'Post', headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(insertData)
        })
        await console.log(result)
        e.target.reset();
        GetCityData();
    }
    const GetCityFormData = async (e) => {
        e.preventDefault();
        const s = { ...insertData }
        const name1 = e.target.getAttribute('name');
        if (name1 === "City_icon") {
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
    const DeleteCityData = async (id) => {
        alert("Deleted");
        const result = await fetch(`http://localhost:5000/city/${id}`, { method: 'Delete' });
        await console.log(result)
        GetCityData()
    }

    useEffect(() => {
        GetCityData()
    }, []);
    return (
        <>
        <NavBarComponent heading={props.heading}/>
            <div className="city">
                <div className='cityitem'>
                    <Form onSubmit={InsertCityData}>
                    <Form.Group className="mb-3" controlId="formGroupstateId" >
                    <label for="Statename">Select State Name</label>
                    <br/>
                    <select id="Statename" name="State_id" onChange={GetCityFormData} required onClick={GetStateData}>
                        <option value={null}>Select State</option>
                        {
                            stateData.map((Data)=>{return(<>
                                <option value={Data.State_id}>{Data.State_name}</option>
                            </>)})
                        }
                    </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupcityName" >
                            <label for="name">City Name</label>
                            <br />
                            <input type="text" id="name" placeholder="City Name" name="City_name"  required onChange={GetCityFormData} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupcityImage">
                            <label for="icon">City Image</label>
                            <br />
                            <input type="file" id='icon' name="City_icon" onChange={GetCityFormData} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupcitypincode">
                            <label for="pincode">City Pincode</label>
                            <br />
                            <input type="number" id='pincode' placeholder="City Pincode" name="City_pincode" onChange={GetCityFormData} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupcitydescription">
                            <label for="city description">Tell us something about your city</label>
                            <br />
                            <textarea id="city description" placeholder="City Description" rows="4" cols="30" name='City_description' onChange={GetCityFormData}></textarea>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className='cityitem'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>City Name</th>
                                <th>City Pincode</th>
                                <th>City Image</th>
                                <th>City Description</th>
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
                                                <td>{data.City_name}</td>
                                                <td>{data.City_pincode}</td>
                                                <td><img src={require(`../img/${data.City_icon}`)} height={50} width={50}/></td>
                                                <td>{data.City_description}</td>
                                                <td><Button variant="danger" onClick={() => { DeleteCityData(data.City_id) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                </svg></Button></td>
                                                <td>
                                                    <EditCityData cityId={data.City_id} GetCityData={GetCityData}/>
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