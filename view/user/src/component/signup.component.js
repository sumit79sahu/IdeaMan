import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {toast} from 'react-toastify';
import '../style.css';
toast.configure();
export default function SignupComponent() {
    const [registrationData,setRegistrationData]=useState({"User_name":"","User_email":"","User_mobileno":"","User_password":""})
    const [confirmPassword,setConfirmPassword]=useState("")
    const GetRegistrationData=async(e)=>
    {
        
        const s={...registrationData};
        const name=e.target.getAttribute('name')
        if(name==="User_confirmpassword")
        {
            setConfirmPassword(e.target.value);
        }
        const value=e.target.value
        s[name]=value;
        setRegistrationData(s);
        // console.log(value);

    }
    const InsertRegistrationData=async(e)=>
    {
        e.preventDefault();
        if(registrationData['User_password']===confirmPassword)
        {
            console.log(registrationData)
            const result=await fetch('http://localhost:5000/registration',{
                method: 'Post', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registrationData)});
            const d=await result.json()
            console.log(d);
            e.target.reset()
            toast.success('Sign Up sucessfully');
        }
        else
        {
            toast.error('Confrim password does not match');
        }

        // console.log(registrationData);
    }
    return (
        <>
        <div className="signup">
            <Form onSubmit={InsertRegistrationData}>
            <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="User_name" type="text" placeholder="Enter Your Name" required onChange={GetRegistrationData}/>
            </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="User_email" type="email" placeholder="Enter email" required onChange={GetRegistrationData}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicMobileNumber">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control  name="User_mobileno" type="number" placeholder="Enter Mobile Number" required onChange={GetRegistrationData}/>
                    </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="User_password" type="password" placeholder="Password" required onChange={GetRegistrationData}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control  name="User_confirmpassword" type="password" placeholder="Confirm Password" required onChange={GetRegistrationData}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </div>
        </>
    );
}