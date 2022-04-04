import './App.css';
import StateLayout from './layouts/state.layout';
import CityLayout from './layouts/city.layout';
import CategoryLayout from './layouts/category.layout';
import SubcategoryLayout from './layouts/subcategory.layout';
import DashboardLayout from './layouts/dashboard.layout';
import LoginLayout from './layouts/login.layout';
import UsersLayout from './layouts/Users.layout';
import { BrowserRouter as Router ,Routes,Route } from "react-router-dom";
function App() {
  return (
    <>
    <Router>
            <Routes>
            <Route path="/" element={<LoginLayout/>}></Route>
            <Route path="/dashboard" element={<DashboardLayout heading="Dashboard"/>}>
                </Route>
                <Route path="/state" element={<StateLayout heading="State"/>}>
                </Route>
                <Route path="/city" element={<CityLayout heading="City"/>}>
                </Route>
                <Route path="/category" element={<CategoryLayout heading="Category"/>}>
                </Route>
                <Route path="/subcategory" element={<SubcategoryLayout heading="Subcategory"/>}>
                </Route>
                <Route path="/users" element={<UsersLayout heading="Users"/>}>
                </Route>
            </Routes>
            </Router>
    </>
  );
}

export default App;
