import LoginComponent from '../components/login.component';
import '../style.css'
export default function LoginLayout() {
    
    return (
        <>
            <div className='login'>
            <div className='loginitem'>
            <h1 className='heading'>
                Admin Login
            </h1>
            <LoginComponent/>
            </div>
            </div>
        </>
    );
}
