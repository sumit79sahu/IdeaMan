import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
toast.configure()
export default function LoginComponent() {
    const navigate=useNavigate();
    const [loginData,SetLoginData]=useState({"User_email":"","User_password":""})
    const GetUserLoginData=async(e)=>
    {
        const s={...loginData};
        const name=e.target.getAttribute('name');
        const value=e.target.value;
        s[name]=value
        SetLoginData(s);
    }
    const VerifyUser=async(e)=>
    {
        e.preventDefault();
        if(loginData["User_password"]==="Sumit@123" && loginData["User_email"]==="sumit79sahu@gmail.com")
        {
            toast.success("Login sucessfully")
            e.target.reset();
            navigate('/dashboard');
        }
        else
        {
            toast.error("Wrong email or password");
        }
    }
    return (
        <>
        <div className='logincomponent'>
                <Form onSubmit={VerifyUser}> 
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="User_email" placeholder="Enter email" onChange={GetUserLoginData} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="User_password" placeholder="Password" onChange={GetUserLoginData} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
        </div>
        </>
    );
}