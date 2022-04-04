import { Overlay, Form, Button, Popover } from "react-bootstrap"
import { useState, useRef } from 'react'
export default function EditIdeaComponent(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const [categoryData, SetCategoryData] = useState([]);
    const [id,SetCategoryId]=useState(0)
    const [insertData, SetInsertData] = useState({ Idea_title: "", Subcategory_id: "", Idea_description: "" })
    const [subcategoryData, SetSubcategoryData] = useState([{Subcategory_name:"",Subcategory_id:""}])
    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    }
    const GetCategoryData = async () => {
        ;
        const result = await fetch('http://localhost:5000/category');
        const data = await result.json()
        SetCategoryData(data)
    }
    const GetIdeaFormData = async (e) => {
        e.preventDefault();
        const s = { ...insertData }
        const name1 = e.target.getAttribute('name');
        const value = e.target.value
        s[name1] = value
        console.log(s)
        SetInsertData(s)

    }
    const GetCategoryId=async(e)=>
    {
        const value=e.target.value
        SetCategoryId(value)
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
    const UpdateUserIdeaData = async (e) => {
        e.preventDefault();
        const result = await fetch(`http://localhost:5000/idea/${props.id}`, {
            method: 'Put', headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(insertData)
        })
        e.target.reset();
        // await console.log(result)
        props.GetUserIdeaData()
    }
    return (
        <>
            <div ref={ref}>
                <Button onClick={handleClick} variant="success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
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
                        <Popover.Header as="h3">Edit Your Idea </Popover.Header>
                        <Popover.Body>
                            <Form onSubmit={UpdateUserIdeaData}>
                                <Form.Group className="mb-3" controlId="formGroupCategoryId" >
                                    <label for="Category">Select Category</label>
                                    <br />
                                    <select id="Category" name="Category_id" required onClick={GetCategoryData} onChange={GetCategoryId}>
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
                                    <select id="Subcategory" name="Subcategory_id" required onClick={GetSubcategoryData} onChange={GetIdeaFormData} >
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
                                    <input type="text" id="name" placeholder="Idea Title" name="Idea_title" required onChange={GetIdeaFormData} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupIdeadescription">
                                    <label for="Idea description">Tell us something about your Idea</label>
                                    <br />
                                    <textarea id="Idea description" placeholder="Idea Description" rows="4" cols="30" name='Idea_description' onChange={GetIdeaFormData}></textarea>
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
        </>
    )
}