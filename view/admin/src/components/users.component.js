export default function UsersComponent(props) {
    // console.log(props.userData);
    return (
        <>
            <tr>
                <td>{props.data.User_name}</td>
                <td>{props.data.User_email}</td>
                <td>{props.data.User_mobileno}</td>
            </tr>
        </>
    );
}