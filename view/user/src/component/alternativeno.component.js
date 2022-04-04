import { useState } from "react";
import { Button } from "react-bootstrap"
export default function AlternativeNoComponent(props) {
    const[data,SetData]=useState({"User_alternativemobileno":props.alternativeno})
    const GetAltenativeNoFormData=async(name,value)=>
    {
        const a={...data}
        a[name]=value
        SetData(a)
    }
    return (
        <>
            <tr>
                <td>Alternative Mobile No</td>
                <td></td>
                <td>
                    <input type="text" name="User_alternativemobileno"  defaultValue={props.alternativeno} onChange={(e)=>{GetAltenativeNoFormData(e.target.getAttribute('name'),e.target.value)}}/>
                </td>
                <td><a href=""  onClick={(e)=>props.GetAlternativeNoData(e,data)} >save</a></td>
                <td><a href="" onClick={(e)=>props.CancelChangeAlternativeNoData(e)}>cancel</a></td>
            </tr>
        </>
    );
}