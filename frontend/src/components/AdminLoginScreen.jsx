import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminLoginMutation } from "../slices/adminApiSlices";
import { setAdminCredentials } from "../slices/authSlices";
import { toast } from 'react-toastify';
import Loader from "./Loader";
import {
    BoxContainer,
    FormContainer,
    Input,
    Button,
    Header
} from "../screens/style";

const AdminLoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [adminLogin, { isLoading }] = useAdminLoginMutation();

    const { adminInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if (adminInfo) {
            navigate('/admin/dashboard');
        }
    }, [navigate, adminInfo]);


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await adminLogin({ email, password }).unwrap();
            dispatch(setAdminCredentials({ ...res }));
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <BoxContainer>
            <div className="card w-25 mx-auto">
                <Header className="card-title text-center mt-4">Admin Login</Header>
                <div className="card-body">
                    <FormContainer onSubmit={submitHandler}>
                        <Input
                            type=""
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="text-center">
                            <Button type="submit">LOG IN</Button>
                        </div>
                        {isLoading && <Loader />}
                    </FormContainer>
                </div>
            </div>
        </BoxContainer>
    );
};

export default AdminLoginScreen;
