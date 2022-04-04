import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
toast.configure()
// let userData={};
function LoginComponent() {
    const navigate= useNavigate()
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
        const result=await fetch(`http://localhost:5000/registration/${loginData.User_email}`)
        const Data= await result.json()
        if(Data[0]["User_password"]===loginData["User_password"])
        {
            toast.success("Login sucessfully",{position: toast.POSITION.BOTTOM_RIGHT})
            e.target.reset();
            navigate(`/home/${Data[0]["User_email"]}/${Data[0]["User_name"]}`)
        }
        else
        {
            toast.error("Wrong email or password",{position: toast.POSITION.BOTTOM_RIGHT});
        }
    }
    return (
        <>
            <div className='login'>
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
export default LoginComponent