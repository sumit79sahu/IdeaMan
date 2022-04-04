import { Form, Button, Popover, Overlay, } from 'react-bootstrap';
import { useState, useRef } from 'react';
export default function EditCityData(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const [stateDate, setStateData] = useState([])
    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };
    const [insertData, setInsertData] = useState({ City_name: "", City_icon: "", City_description: "" });
    const GetStateData = async () => {
        const result = await fetch('http://localhost:5000/state');
        const s = await result.json()
        setStateData(s);
    }
    const UpdateCityData = async (e) => {
        e.preventDefault();
        console.log(insertData)
        const result = await fetch(`http://localhost:5000/city/${props.cityId}`, {
            method: 'Put', headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(insertData)
        })
        e.target.reset();
        // await console.log(result)
        props.GetCityData()
    }
    const GetCityFormData = async (e) => {
        e.preventDefault();
        const s = { ...insertData }
        const name1 = e.target.getAttribute('name');
        if (name1 === "City_icon") {
            const value = e.target.files[0]
            s[name1] = value.name
            console.log(s[name1])
            // setInsertData(s)
        }
        else {
            const value = e.target.value
            s[name1] = value
            console.log(s[name1])
        }
        setInsertData(s)
        // console.log(name)
        // console.log(value)

    }

    return (
        <div ref={ref}>
            <Button variant="success" onClick={handleClick}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg></Button>

            <Overlay
                show={show}
                target={target}
                placement="left"
                container={ref}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <Popover.Header as="h3">Edit City Data</Popover.Header>
                    <Popover.Body>
                        <Form onSubmit={UpdateCityData}>
                            <Form.Group className="mb-3" controlId="formGroupstateId" >
                                <label for="Statename">Select State Name</label>
                                <br />
                                <select id="Statename" name="State_id" required onChange={GetCityFormData} onClick={GetStateData}>
                                    <option value={null}>Select State</option>
                                    {
                                        stateDate.map((Data) => {
                                            return (<>
                                                <option value={Data.State_id}>{Data.State_name}</option>
                                            </>)
                                        })
                                    }
                                </select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupCityName" >
                                <label for="name">City Name</label>
                                <br />
                                <input type="text" id="name" placeholder="City Name" name="City_name" required onChange={GetCityFormData} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupcitypincode">
                                <label for="pincode">City Pincode</label>
                                <br />
                                <input type="number" id='pincode' placeholder='City Pincode' name="City_pincode" onChange={GetCityFormData} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupCityImage">
                                <label for="icon">City Image</label>
                                <br />
                                <input type="file" id='icon' name="City_icon" onChange={GetCityFormData} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupCitydescription">
                                <label for="City description">Tell us something about your City</label>
                                <br />
                                <textarea id="City description" placeholder="City Description" rows="4" cols="30" name='City_description' onChange={GetCityFormData}></textarea>
                            </Form.Group>
                            <Button variant="success" type="sumbit" onClick={handleClick}>
                                save
                            </Button>{' '}
                            <Button variant="primary" onClick={handleClick}>
                                cancel
                            </Button>
                        </Form>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
}
