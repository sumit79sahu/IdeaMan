import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LoginLayout from './layout/loginsignup.layout'
import HomeLayout from './layout/home.layout';
import ProfileLayout from './layout/profile.layout';
import IdeaLayout from './layout/idea.layout';
import UserLayout from './layout/user.layout';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LoginLayout/>}></Route>
        <Route path='/home/:User_email/:User_name' element={<HomeLayout/>}> </Route>
        <Route path='/idea/:User_email/:User_name' element={<IdeaLayout/>}> </Route>
        <Route path='/profile/:User_email/:User_name' element={<ProfileLayout/>}></Route>
        <Route path='/user/:User_email/:User_name/:Another_useremail' element={<UserLayout/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
