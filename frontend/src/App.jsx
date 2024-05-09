import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminHeader from './components/HeaderAdmin';
import './index.css'
import styled from "styled-components";
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 100px;

`;

const App = () => {
  return (
    <>
    <AdminHeader />
      <ToastContainer />
      <AppContainer>
      <Container className="">
        <Outlet />
        </Container>
      </AppContainer>
    </>
  );
};

export default App;