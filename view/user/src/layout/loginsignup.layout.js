import { Tab, Tabs } from 'react-bootstrap';
import LoginComponent from '../component/login.component';
import SignupComponent from '../component/signup.component';
import '../style.css'
import { useState } from 'react';
export default function LoginSignUp() {
    const [key, setKey] = useState('Login');

    return (
        <>
            <div className='loginsignup'>
            <div className='loginsignupitem'>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3 item"
                >
                    <Tab eventKey="Login" title="Login">
                        <LoginComponent />
                    </Tab>
                    <Tab eventKey="SignUp" title="Sign Up">
                        <SignupComponent />
                    </Tab>
                </Tabs>
            </div>
            </div>
        </>
    );
    // console.log()
}