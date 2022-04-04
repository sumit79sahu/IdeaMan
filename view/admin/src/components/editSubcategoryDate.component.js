import { Form, Button, Popover, Overlay, } from 'react-bootstrap';
import { useState, useRef } from 'react';
export default function EditSubcategoryData(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const [categoryDate, setCategoryData] = useState([])
    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };
    const [insertData, setInsertData] = useState({Category_id:"", Subcategory_name: "", Subcategory_icon: "", Subcategory_description: "" });
    const GetCategoryData = async () => {
        const result = await fetch('http://localhost:5000/category');
        const s = await result.json()
        setCategoryData(s);
    }
    const UpdateSubcategoryData = async (e) => {
        e.preventDefault();
        console.log(insertData)
        const result = await fetch(`http://localhost:5000/subcategory/${props.subcategoryId}`, {
            method: 'Put', headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(insertData)
        })
        e.target.reset();
        props.GetSubcategoryData()
        await console.log(result)
    }
    const GetSubcategoryFormData = async (e) => {
        e.preventDefault();
        const s = { ...insertData }
        const name1 = e.target.getAttribute('name');
        if (name1 === "Subcategory_icon") {
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
                    <Popover.Header as="h3">Edit Subcategory Data</Popover.Header>
                    <Popover.Body>
                        <Form onSubmit={UpdateSubcategoryData}>
                            <Form.Group className="mb-3" controlId="formGroupCategoryId" >
                                <label for="Categoryname">Select Category Name</label>
                                <br />
                                <select id="Categoryname" name="Category_id" required onChange={GetSubcategoryFormData} onClick={GetCategoryData}>
                                    <option value={null}>Select Category</option>
                                    {
                                        categoryDate.map((Data) => {
                                            return (<>
                                                <option value={Data.Category_id}>{Data.Category_name}</option>
                                            </>)
                                        })
                                    }
                                </select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupSubcategoryName" >
                                <label for="name">Subcategory Name</label>
                                <br />
                                <input type="text" id="name" placeholder="Subcategory Name" name="Subcategory_name" required onChange={GetSubcategoryFormData} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupSubcategoryImage">
                                <label for="icon">Subcategory Image</label>
                                <br />
                                <input type="file" id='icon' name="Subcategory_icon" onChange={GetSubcategoryFormData} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupSubcategorydescription">
                                <label for="Subcategory description">Tell us something about your Subcategory</label>
                                <br />
                                <textarea id="Subcategory description" placeholder="Subcategory Description" rows="4" cols="30" name='Subcategory_description' onChange={GetSubcategoryFormData}></textarea>
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
