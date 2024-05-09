import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../slices/authSlices';
import { useAdminLogoutMutation } from '../slices/adminApiSlices';
import { HeaderContainer } from '../screens/style';

const HeaderAdmin = () => {
    const { adminInfo } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [adminLogoutApi] = useAdminLogoutMutation();

    const logoutHandler = async () => {
        try {
            await adminLogoutApi().unwrap();
            dispatch(adminLogout());
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <HeaderContainer>
            <Navbar variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/admin/dashboard'>
                        <Navbar.Brand>
                            <img
                                src="/logo/logo.png"
                                width="40"
                                height="40"
                                className="d-inline-block align-top"
                                alt="Admin Logo"
                            />
                            <span className="ms-4 text-dark"><b>Admin Panel</b></span>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        {adminInfo && (
                            <div className='flex-grow-1 d-flex align-items-center justify-content-center'>
                                <Nav.Link href="/admin/dashboard" className="me-lg-3">Home</Nav.Link>
                                <Nav.Link href="/admin/employeeList" className="me-lg-3">Employee List</Nav.Link>
                            </div>
                        )}
                        <Nav className='ms-auto d-flex align-items-lg-center'>
                            {adminInfo && (
                                <>
                                    <Nav.Item className="me-lg-3 d-flex align-items-center">
                                        <span className="text-light me-2"><b className='text-secondary'>{adminInfo.name}</b> </span>
                                    </Nav.Item>
                                    <Button className='shadow border-0' style={{ backgroundColor: 'white', color: '#ffa100' }} onClick={logoutHandler}>Logout</Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </HeaderContainer>
    );
};
export default HeaderAdmin;
