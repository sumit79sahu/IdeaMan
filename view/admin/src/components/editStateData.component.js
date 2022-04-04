import { Form, Button, Popover, Overlay, } from 'react-bootstrap';
import { useState,useRef } from 'react';
export default function EditStateData(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };
    const [insertData, setInsertData] = useState({ State_name: "", State_icon: "", State_description: "" })
    const UpdateStateData=async(e)=>
    {
        e.preventDefault();
        console.log(insertData)
        const result = await fetch(`http://localhost:5000/state/${props.stateId}`, {
            method: 'Put', headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(insertData)
        })
        e.target.reset();
        props.GetStateData();
        await console.log(result)
    }
    const GetStateFormData = async (e) => {
        e.preventDefault();
        const s = { ...insertData }
        const name1 = e.target.getAttribute('name');
        if (name1 === "State_icon") {
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
                    <Popover.Header as="h3">Edit State Data</Popover.Header>
                    <Popover.Body>
                        <Form onSubmit={UpdateStateData}>
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
                            <Form.Group className="mb-3" controlId="formGroupStateImage">
                                <label for="state description">Tell us something about your state</label>
                                <br />
                                <textarea id="state description" placeholder="State Description" rows="4" cols="30" name='State_description' onChange={GetStateFormData}></textarea>
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
