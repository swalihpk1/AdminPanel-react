import React from 'react';
import { Container, Card } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

const Admindashboard = () => {
    return (

        <Container className='d-flex justify-content-center'>
            <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                <h3 className='text-center mb-4' style={{ fontFamily: "cursive" }}>Welcome to Admin panel</h3>
                <LinkContainer to='/admin/employeeList'>
                    <button className='btn btn-outline-warning'>Employees list</button>
                </LinkContainer>
            </Card>
        </Container>

    );
};

export default Admindashboard;