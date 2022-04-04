import { useState } from "react";
import { Button, Card,Table } from "react-bootstrap";
export default function AboutComponent(props) {
// console.log(props)
const [data,SetData]=useState({"DateofBirth":props.aboutData.DateofBirth,"Gender":props.aboutData.Gender,"Profile_picture":props.aboutData.Profile_picture})
const GetEditFormAboutData=async(name1,value)=>
{
    const a={...data}
    if(name1==='Profile_picture')
    {
        // console.log(value.name)
        a[name1]=value.name
        console.log(a[name1])
    }
    else
    {
        a[name1]=value
        console.log(a)
    }
    SetData(a)
}
    return (
        <>
            <Card.Body>
            <form  onSubmit={(e)=>{props.GetEditAboutData(e,data)}}>
            <Table>
            <tbody>
            <tr>
                    <td>Name</td>
                    <td></td>
                    <td>{props.aboutData.User_name}</td>
                </tr>
                <tr>
                    <td>Date of Birth</td>
                    <td></td>
                    <td><input type="date" name="DateofBirth" defaultValue={props.aboutData.DateofBirth} required onChange={(e)=>{GetEditFormAboutData(e.target.getAttribute('name'),e.target.value)}} /></td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td></td>
                    <td><input type="text" name="Gender" defaultValue={props.aboutData.Gender} required  onChange={(e)=>GetEditFormAboutData(e.target.getAttribute('name'),e.target.value)}/></td>
                    {/* <td></td> */}
                </tr>
                <tr>
                    <td>Profile Picture</td>
                    <td></td>
                    <td><input type="file" name="Profile_picture"  onChange={(e)=>GetEditFormAboutData(e.target.name,e.target.files[0])}/></td>
                </tr>
            </tbody>
            </Table>
            <Button type="submit" variant="outline-primary">Save</Button>{' '}
            <Button onClick={(e)=>{props.CancelEditAboutData(e)}} variant="outline-danger">Cancel</Button>{' '}
            </form>
            </Card.Body>
            </>
            );
}