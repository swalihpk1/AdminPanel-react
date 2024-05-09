import React, { useState } from "react";
import FormContainer from "../../components/formContainer";
import { Form, Image } from "react-bootstrap";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useAddNewUserMutation } from "../../slices/adminApiSlices";
import { useNavigate } from "react-router-dom";
import { Button } from "../style";

const AdminAddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const [addNewUser] = useAddNewUserMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        const emailRegex = /^\S+@\S+\.\S+$/;

        if (name.trim().length === 0) {
            toast.error("Inputs can't be empty");
        } else if (mobile.length !== 10) {
            toast.error("Mobile must be 10 digits");
        } else if (!emailRegex.test(email)) {
            toast.error("Invalid email");
        } else {
            try {
                setIsLoading(true);

                const formData = new FormData();
                formData.append("name", name);
                formData.append("email", email);
                formData.append("mobile", mobile);
                formData.append("designation", designation);
                formData.append("gender", gender);
                formData.append("course", course);
                formData.append("file", image);

                await addNewUser(formData).unwrap();
                toast.success("User added!");
                navigate("/admin/employeeList");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const validExtensions = ["jpg", "png"];

        if (
            file &&
            validExtensions.includes(file.name.split(".").pop().toLowerCase())
        ) {
            setImage(file);
        } else {
            setImage(null);
            toast.error("Image must be PNG / JPG");
        }
    };

    return (
        <FormContainer>
            <h3 className="text-center">Create Employee</h3>

            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type=""
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="mobile">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="designation">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                        as="select"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="Male"
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <Form.Check
                            inline
                            label="Female"
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="course">
                    <Form.Label>Course</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="MCA"
                            type="checkbox"
                            id="mca"
                            checked={course === "MCA"}
                            onChange={() => setCourse("MCA")}
                        />
                        <Form.Check
                            inline
                            label="BCA"
                            type="checkbox"
                            id="bca"
                            checked={course === "BCA"}
                            onChange={() => setCourse("BCA")}
                        />
                        <Form.Check
                            inline
                            label="BSC"
                            type="checkbox"
                            id="bsc"
                            checked={course === "BSC"}
                            onChange={() => setCourse("BSC")}
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image Upload</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {image && (
                        <div className="w-25 mt-2 h-25">
                            <Image src={URL.createObjectURL(image)} alt="User Image" fluid />
                        </div>
                    )}
                </Form.Group>

                {isLoading && <Loader />}

                <div className="text-center">
                    <Button type="submit" variant="outline-primary" className="">
                        Add User
                    </Button>
                </div>
            </Form>
        </FormContainer>
    );
};

export default AdminAddUser;
