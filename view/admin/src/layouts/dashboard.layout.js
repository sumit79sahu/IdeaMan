import DashboardComponent from "../components/dashboard.component"
import NavBarComponent from "../components/navbar.component"
import { useEffect, useState } from "react";
export default function DashboardLayout(props) {
    const [details, setDetails] = useState({});
    const GetDetails = async () => {
        const result = await fetch("http://localhost:5000/dashboard");
        const s = await result.json()
        setDetails(s)
    }
    useEffect(() => { GetDetails() }, [])
    return (
        <>
            <NavBarComponent heading={props.heading} />
            <DashboardComponent details={details} />
        </>
    )
}