import { Button, Card, Table } from "react-bootstrap";
import { useState } from "react";
export default function EducationComponent(props) {
    const [data, SetData] = useState({
        Class12_schoolname: props.educationData.Class12_schoolname,
        Class10_schoolname: props.educationData.Class10_schoolname, Class12_percentage: props.educationData.Class12_percentage,
         Class10_percentage: props.educationData.Class10_percentage,
        Degree: props.educationData.Degree, Specialization: props.educationData.Specialization
    })
    const GetEditUserEducationFormData=async(name,value)=>
    {
        const a={...data}
        a[name]=value
        // console.log(a)
        SetData(a)
    }
    return (
        <>
            <Card.Body>
                <form onSubmit={(e) => { props.GetEditUserEducationData(e, data) }}>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Class 12 School Name</td>
                                <td><input type="text" name="Class12_schoolname"  required defaultValue={props.educationData.Class12_schoolname}  onChange={(e)=>GetEditUserEducationFormData(e.target.getAttribute('name'),e.target.value)}/></td>
                                <td>Class 12 Percentage</td>
                                <td><input type="text" name="Class12_percentage" required  defaultValue={props.educationData.Class12_percentage}  onChange={(e)=>GetEditUserEducationFormData(e.target.getAttribute('name'),e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td>Class 10 School Name</td>
                                <td><input type="text" name="Class10_schoolname" required  defaultValue={props.educationData.Class10_schoolname}  onChange={(e)=>GetEditUserEducationFormData(e.target.getAttribute('name'),e.target.value)}/></td>
                                <td>Class 10 Percentage</td>
                                <td><input type="text" name="Class10_percentage" required  defaultValue={props.educationData.Class10_percentage} onChange={(e)=>GetEditUserEducationFormData(e.target.getAttribute('name'),e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Degree</td>
                                <td><input type="text" name="Degree" required  defaultValue={props.educationData.Degree} onChange={(e)=>GetEditUserEducationFormData(e.target.getAttribute('name'),e.target.value)} /></td>
                                <td>Specialization</td>
                                <td><input type="text" name="Specialization" required  defaultValue={props.educationData.Specialization}  onChange={(e)=>GetEditUserEducationFormData(e.target.getAttribute('name'),e.target.value)}/></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button type="submit" variant="outline-primary">Save</Button>{' '}
                    <Button onClick={props.CancelEditUserEducationData} variant="outline-danger">Cancel</Button>{' '}
                </form>
            </Card.Body>
        </>
    );
}