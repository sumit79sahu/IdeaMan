import { useState } from "react";
// import InformationComponent from '../components/information.component'
import { Button, Card, Modal } from "react-bootstrap";
import "../style.css"
import { Link } from "react-router-dom";

export default function DashboardComponent(props) {
    return (
        <>
            <div className="dashboard">
                <div className="dashboarditem">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Total No of States:</Card.Title>
                            <Card.Text>
                                <h1>{props.details.State}</h1>
                            </Card.Text>
                            <Button>Click for more information</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="dashboarditem">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Total No of Cities:</Card.Title>
                            {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                            <Card.Text>
                                <h1>{props.details.City}</h1>
                            </Card.Text>
                            <Button>Click for more information</Button>
                            
                        </Card.Body>
                    </Card>
                </div>
                <div className="dashboarditem">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Total No of Category:</Card.Title>
                            {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                            <Card.Text>
                                <h1>{props.details.Category}</h1>
                            </Card.Text>
                            <Button>Click for more information</Button>
                            
                        </Card.Body>
                    </Card>
                </div>
                <div className="dashboarditem">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Total No of Subcategory:</Card.Title>
                            {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                            <Card.Text>
                                <h1>{props.details.Subcategory}</h1>
                            </Card.Text>
                            <Button>Click for more information</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="dashboarditem">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Total No of Users:</Card.Title>
                            <Card.Text>
                                <h1>{props.details.Users}</h1>
                            </Card.Text>
                            <Button as={Link} to={'/users'}>Click for more information</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}