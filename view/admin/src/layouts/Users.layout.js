import UsersComponent from "../components/users.component";
import NavBarComponent from "../components/navbar.component";
import { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
export default function UsersLayout(props) {
    const [userData, setUserData] = useState([])
    const GetUsersData = async () => {
        const result = await fetch('http://localhost:5000/registration');
        const d = await result.json();
        // console.log(d);
        setUserData(d)
    }
    useEffect(() => { GetUsersData() }, [])
    return (
        <>
            <NavBarComponent heading={props.heading} />
            <Table><thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                </tr>
            </thead>
                <tbody>
                    {
                        userData.map((data) => {
                            return (
                                <>
                                    <UsersComponent data={data} />
                                </>
                            );
                        })
                    }
                </tbody>
            </Table>
        </>
    );
}