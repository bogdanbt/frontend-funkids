import React from "react";
import { Card, Button } from "react-bootstrap";
import "./Course.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from "../config"; // Importing base URL server configuration, example usage `${config.apiBaseUrl}/api/courses`
import { setRole, clearRole } from "../redux/userSlice"; // Экшены из Redux
import { useSelector } from "react-redux";

// import { jwtDecode } from "jwt-decode";
// const handleRegisterClick = async (courseId, navigate) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//         // If there's no token, redirect to login page
//         navigate("/login");
//     } else {
//         // If token exists, send a request to register for the course
//         try {
//             const response = await axios.post(
//                 `${config.apiBaseUrl}/register-course`,
//                 { courseId },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             if (response.status === 200) {
//                 alert("You have successfully registered for the course!");
//             }
//         } catch (error) {
//             console.error("Registration error:", error);
//         }
//     }
// };

// const handleDeleteClick = async (courseId, removeCourseFromList) => {
//     const token = localStorage.getItem("token");

//     try {
//         const response = await axios.delete(
//             `${config.apiBaseUrl}/courses/${courseId}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );
//         if (response.status === 200) {
//             alert("Course successfully deleted!");
//             removeCourseFromList(courseId); // Remove course from local state
//         }
//     } catch (error) {
//         console.error("Error deleting course:", error);
//     }
// };

function Course({ courseId, title, description, foto }) {
    const navigate = useNavigate();
    //const role = useSelector((state) => state.user.role);
    // const handleEditClick = () => {
    //     navigate(`/edit-course/${courseId}`);
    // };

    //const token = localStorage.getItem("token");
    // let teacherId;
    // if (token) {
    //     const decodedToken = jwtDecode(token);
    //     teacherId = decodedToken.id; // Извлекаем ID учителя из токена
    // }
    // console.log(teacherId);
    // console.log(authorTeacherId);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Card className="course-card" style={{ width: "90%" }}>
                    <div className="row no-gutters">
                        <div className="col-md-8">
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>{description}</Card.Text>

                                <Link to={courseId}>More ...</Link>
                            </Card.Body>
                        </div>
                        <div className="col-md-4">
                            <Card.Img src={foto} alt={title} />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Course;
