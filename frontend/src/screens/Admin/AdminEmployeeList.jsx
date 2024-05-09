import React, { useEffect, useState } from "react";
import {
    Button,
    Container,
    Form,
    Modal,
    Table,
    Dropdown,
    DropdownButton,
    Card,
} from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {
    useDeleteUserMutation,
    useGetUsersDataMutation,
    useActivationUserMutation,
} from "../../slices/adminApiSlices";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { FaPlus, FaSearch } from "react-icons/fa";

const PAGE_SIZE = 8;

const AdminHomeScreen = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(true);
    const [sortBy, setSortBy] = useState("id");
    const [isBlocked, setIsBlocked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [getUsersData, { isLoading }] = useGetUsersDataMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [activationUser] = useActivationUserMutation();

    const filteredUsers = users.filter((user) => {
        const searchData = Object.values(user)
            .join(" ")
            .toLowerCase();
        const searchValue = search.toLowerCase();
        return searchData.includes(searchValue);
    });

    const sortedUsers = filteredUsers.slice().sort((a, b) => {
        let comparisonValue = 0;
        switch (sortBy) {
            case "name":
                comparisonValue = a.name.localeCompare(b.name);
                break;
            case "email":
                comparisonValue = a.email.localeCompare(b.email);
                break;
            case "id":
                comparisonValue = a._id.localeCompare(b._id);
                break;
            case "date":
                comparisonValue = new Date(a.createdAt) - new Date(b.createdAt);
                break;
            default:
                comparisonValue = a.name.localeCompare(b.name);
        }
        return comparisonValue;
    });

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await getUsersData().unwrap();
                setUsers(res.user);
            } catch (error) {
                console.error("Failed to fetch users: ", error);
            }
        }
        fetchUser();
    }, [data, getUsersData]);

    const toggleActivation = async (userId, isBlocked) => {
        try {
            const res = await activationUser({ id: userId, isBlocked: isBlocked });
            console.log("Response:", res);
            const updatedUsers = users.map((user) =>
                user._id === userId ? { ...user, isBlocked: isBlocked } : user
            );
            setUsers(updatedUsers);
            if (res) {
                toast.success(
                    `User ${isBlocked ? "activated" : "deactivated"} successfully`
                );
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const deleteHandler = async (id) => {
        setSelectedUserId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteUser(selectedUserId).unwrap();
            const updatedUsers = users.filter((user) => user._id !== selectedUserId);
            setUsers(updatedUsers);
            setShowModal(false);
            toast.success("User deleted");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSortChange = (sortByValue) => {
        setSortBy(sortByValue);
    };

    const totalPageCount = Math.ceil(sortedUsers.length / PAGE_SIZE);

    const paginatedUsers = sortedUsers.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <Container style={{ border: "1px solid #ccc", padding: "20px" }}>
            <h3 className="text-center">Employee list</h3>
            <Form.Group
                className="mt-3 mt-5 d-flex align-items-center"
                controlId="searchForm"
            >
                <Form.Label className="me-3">
                    <FaSearch style={{ marginRight: "5px" }} />
                </Form.Label>
                <Form.Control
                    style={{ width: "30vw", marginBottom: "10px" }}
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
                <div>
                    <DropdownButton
                        variant="bt btn-secondary"
                        id="dropdown-sort-by"
                        title={`Sort by: ${sortBy}`}
                    >
                        <Dropdown.Item onClick={() => handleSortChange("id")}>
                            ID
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("name")}>
                            Name
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("email")}>
                            Email
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("date")}>
                            Create Date
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
                <div>
                    <Card className="p-1">
                        <b>Total employees : {users.length}</b>
                    </Card>
                </div>
                <Link to="/admin/createEmployee">
                    <Button variant="btn btn-warning">
                        <FaPlus style={{ marginRight: "5px" }} />
                        Create employee
                    </Button>
                </Link>
            </div>

            {isLoading && <Loader />}

            <div className="table-responsive" style={{ overflowX: "auto" }}>
                <Table
                    striped
                    bordered
                    hover
                    className="mt-5 text-center align-middle"
                >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Create date</th>
                            <th>Active/deactive</th>
                            <th></th>
                            <th></th>
                         
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div style={{ width: "100px", height: "100px" }}>
                                        <img
                                            className="w-100 h-100"
                                            src={user.imageUrl ? user.imageUrl : "/logo/profile.jpg"}
                                            alt=""
                                        />
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.designation}</td>
                                <td>{user.gender}</td>
                                <td>{user.course}</td>
                                <td>
                                    {new Date(user.createdAt).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "2-digit",
                                    })}
                                </td>
                                <td>
                                    <BootstrapSwitchButton
                                        checked={user.isBlocked}
                                        onstyle="danger"
                                        offlabel="Activate"
                                        onlabel="Deactivate"
                                        offstyle="success"
                                        size="sm"
                                        width={100}
                                        onChange={() =>
                                            toggleActivation(user._id, !user.isBlocked)
                                        }
                                    />
                                </td>
                                <td>
                                    <Link to={`/admin/editEmployee/${user._id}`}>
                                        <Button variant="outline-success">Edit</Button>
                                    </Link>
                                </td>
                                <td>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center">
                    {Array.from({ length: totalPageCount }, (_, i) => (
                        <Button
                            key={i}
                            variant="warning"
                            className="mx-1"
                            onClick={() => changePage(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    ))}
                </div>
            </div>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdminHomeScreen;

