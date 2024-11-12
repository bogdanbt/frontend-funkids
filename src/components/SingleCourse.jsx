import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { Card, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setRole, clearRole } from "../redux/userSlice";
import Spinner from "./Spinner";

const handleRegisterClick = async (courseId, navigate, userEmail) => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
    } else {
        try {
            const response = await axios.post(
                `${config.apiBaseUrl}/register-course`,
                {
                    email: userEmail, // Pass user email
                    courseId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                alert("You have successfully registered for the course!");
            }
            console.log(response.data.message);
        } catch (error) {
            console.error("Registration error:", error);
        }
    }
};

function SingleCourse() {
    const { courseId } = useParams(); // Using courseId from URL
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
    const navigate = useNavigate();
    let userId, role, userEmail;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.id;
            role = decodedToken.role;
            userEmail = decodedToken.email; // Get email from token

            if (decodedToken.exp * 1000 > Date.now()) {
                dispatch(setRole(role));
            } else {
                localStorage.removeItem("token");
                dispatch(clearRole());
                alert("Token has expired, please log in again.");
            }
        } catch (error) {
            console.error("Token decoding error:", error);
            localStorage.removeItem("token");
            dispatch(clearRole());
        }
    }

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(
                    `${config.apiBaseUrl}/courses/${courseId}`
                );
                setCourse(response.data);
                setLessons(response.data.lessons); // Get lessons from response
            } catch (error) {
                console.error("Error loading course:", error);
            } finally {
                setLoading(false); // Отключаем состояние загрузки после завершения
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId]);

    const onDelete = async () => {
        if (!token) {
            alert("You must log in to delete the course.");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.delete(
                `${config.apiBaseUrl}/courses/${courseId}`, // Using courseId
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Course successfully deleted.");
                navigate("/allcourses");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            alert("Failed to delete course.");
        }
    };

    const onEdit = () => {
        navigate(`/edit-course/${courseId}`);
    };

    // Modal window for admin
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    // Function to get the list of students when opening the modal window
    const openModal = async () => {
        setIsModalOpen(true);
        try {
            const response = await axios.get(
                `${config.apiBaseUrl}/students/list`
            );
            setStudents(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error getting student list:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStudents([]); // Clear selected students when closing
    };

    const handleStudentSelect = (studentId) => {
        const student = students.find((student) => student._id === studentId);
        if (student) {
            setSelectedStudents((prevSelected) =>
                prevSelected.includes(student.email)
                    ? prevSelected.filter((email) => email !== student.email)
                    : [...prevSelected, student.email]
            );
            console.log("Current list of selected students:", selectedStudents); // Debug
        }
    };

    const handleSubmit = async () => {
        try {
            console.log("Sending studentEmails to server:", selectedStudents); // Debug
            await axios.post(
                `${config.apiBaseUrl}/courses/${courseId}/add-students`,
                {
                    studentIds: selectedStudents, // Pass array of student emails directly
                }
            );
            alert("Students successfully added to the course");
            closeModal();
        } catch (error) {
            console.error("Error adding students to course:", error);
        }
    };

    return loading ? (
        <Spinner />
    ) : (
        <div className="container pt-3">
            <div className="row align-items-center">
                <div className="col-12 col-md-8">
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>

                    {(role === "admin" ||
                        (role === "teacher" &&
                            userId === course.teacherId)) && (
                        <div className="d-flex flex-wrap">
                            <Button
                                variant="secondary"
                                onClick={onEdit}
                                className="mb-2 me-2 btn-sm"
                            >
                                Edit course
                            </Button>
                            <Button
                                variant="danger"
                                onClick={onDelete}
                                className="mb-2 me-2 btn-sm"
                            >
                                Delete course
                            </Button>
                            <Button
                                variant="danger"
                                onClick={openModal}
                                className="mb-2 me-2 btn-sm"
                            >
                                Add students to course
                            </Button>
                            <Link to={`/allcourses/${courseId}/addlesson`}>
                                <Button
                                    variant="primary"
                                    className="mb-2 me-2 btn-sm"
                                >
                                    Add lesson
                                </Button>
                            </Link>
                        </div>
                    )}
                    {role !== "teacher" && role !== "admin" && (
                        <Button
                            variant="primary"
                            onClick={() =>
                                handleRegisterClick(
                                    courseId,
                                    navigate,
                                    userEmail
                                )
                            }
                            className="mb-2 btn-sm"
                        >
                            Registration
                        </Button>
                    )}
                </div>
                <div className="col-md-4 align-items-center">
                    <img
                        src={course.foto}
                        alt="Image description"
                        className="img-fluid rounded"
                    />
                </div>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Select students</h3>
                        <ul>
                            {students.map((student) => (
                                <li key={student._id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={student._id}
                                            onChange={() =>
                                                handleStudentSelect(student._id)
                                            }
                                        />
                                        {student.fullName}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleSubmit}>
                            Add selected students
                        </button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}

            <div>
                <h2 className="mb-4 text-center">Lessons</h2>
                <div className="d-flex flex-wrap justify-content-center gap-4">
                    {lessons.map((lesson) => (
                        <Card
                            className="lesson-card shadow-sm m-4"
                            key={lesson.id}
                            style={{
                                width: "250px",
                                backgroundColor: "#f8f9fa",
                                borderRadius: "10px",
                            }}
                        >
                            <Card.Img
                                variant="top"
                                src={lesson.photo || "default_photo_url.jpg"}
                                style={{
                                    height: "200px",
                                    objectFit: "cover",
                                    borderTopLeftRadius: "10px",
                                    borderTopRightRadius: "10px",
                                }}
                            />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div>
                                    <Card.Title className="text-center">
                                        {lesson.title}
                                    </Card.Title>
                                    <Card.Text className="text-center">
                                        {lesson.description}
                                    </Card.Text>
                                </div>
                                <Link
                                    to={`/allcourses/${courseId}/lesson/${lesson.id}`}
                                >
                                    <Button
                                        variant="primary"
                                        className="w-100 ml-2"
                                    >
                                        More
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default SingleCourse;
