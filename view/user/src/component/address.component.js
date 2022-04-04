import { useState } from "react"
import { Card, Button, Table,NavDropdown } from "react-bootstrap"
export default function AddressComponent(props) {
    const [data, SetData] = useState({ "City_id": props.addressData.City_id, "Address": props.addressData.Address })
    const [state, SetState] = useState([])
    const [city, SetCity] = useState([])
    const [Id, SetId] = useState(props.addressData.State_id)
    const GetStateData = async (e) => {
        const result = await fetch(`http://localhost:5000/state`)
        const data = await result.json()
        // console.log(data)
        SetState(data)
    }
    const GetStateId = async (e) => {
        const value = e.target.value
        SetId(value)
    }
    const GetCityData = async () => {
        const result = await fetch(`http://localhost:5000/usercity/${Id}`)
        const data = await result.json()
        console.log(data)
        SetCity(data)
    }
    const GetAddressFormData = async (name, value) => {
        const a = { ...data }
        a[name] = value
        SetData(a)
    }
    return (
        <>
            <Card.Body>
                <form onSubmit={(e) => props.GetEditUserAddressData(e, data)}>

                    <Table>
                        <tbody>
                            <tr>
                                <td>State</td>
                                <td></td>
                                <td>
                                    <select name="State_id" required onClick={GetStateData} onChange={GetStateId}>
                                        <option value={props.addressData.State_id} selected>{props.addressData.State_name}</option>
                                        <NavDropdown.Divider />
                                        {state.map((data1) => {
                                            return (<>
                                                <option value={data1.State_id}>{data1.State_name}</option>
                                            </>)
                                        })}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td></td>
                                <td>
                                    <select name="City_id" onClick={GetCityData} required onChange={(e) => GetAddressFormData(e.target.getAttribute('name'), e.target.value)}>
                                        <option value={props.addressData.City_id} selected>{props.addressData.City_name}</option>
                                        <NavDropdown.Divider />
                                            {city.map((data1) => {
                                                return (<>
                                                    <option value={data1.City_id}>{data1.City_name}</option>
                                                </>)
                                            })}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Pincode</td>
                                <td></td>
                                <td><input value={props.addressData.City_pincode}  disabled/></td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td></td>
                                <td><input name="Address" required defaultValue={props.addressData.Address} onChange={(e) => GetAddressFormData(e.target.getAttribute('name'), e.target.value)} /></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button type="submit" variant="outline-primary">Save</Button>{' '}
                    <Button onClick={props.CancelEditUserAddressData} variant="outline-danger">Cancel</Button>{' '}
                </form>
            </Card.Body>
        </>
    )
}