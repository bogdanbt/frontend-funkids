import React from "react";
import { Card, Button } from "react-bootstrap";
import "./Course.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config"; // Импортируем base url serverконфигурацию пример использования `${config.apiBaseUrl}/api/courses`

const handleRegisterClick = async (courseId, navigate) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // If there's no token, redirect to login page
        navigate("/login");
    } else {
        // If token exists, send a request to register for the course
        try {
            const response = await axios.post(
                `${config.apiBaseUrl}/register-course`,
                { courseId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                alert("You have successfully registered for the course!");
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    }
};

const handleDeleteClick = async (courseId, removeCourseFromList) => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.delete(
            `${config.apiBaseUrl}/courses/${courseId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200) {
            alert("Курс успешно удален!");
            removeCourseFromList(courseId); // Удаляем курс из локального состояния
        }
    } catch (error) {
        console.error("Ошибка удаления курса:", error);
    }
};

function Course({
    courseId,
    title,
    description,
    foto,
    isTeacher,
    removeCourseFromList,
    registerButton,
}) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/edit-course/${courseId}`);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Card className="course-card" style={{ width: "90%" }}>
                    <div className="row no-gutters">
                        <div className="col-md-8">
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>{description}</Card.Text>
                                {registerButton && (
                                    <Button
                                        type="button"
                                        variant="primary"
                                        onClick={() =>
                                            handleRegisterClick(
                                                courseId,
                                                navigate
                                            )
                                        }
                                    >
                                        Записаться
                                    </Button>
                                )}
                                {isTeacher && (
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={handleEditClick}
                                        className="ml-2"
                                    >
                                        Редактировать
                                    </Button>
                                )}
                                {isTeacher && (
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() =>
                                            handleDeleteClick(
                                                courseId,
                                                removeCourseFromList
                                            )
                                        }
                                        className="ml-2"
                                    >
                                        Удалить
                                    </Button>
                                )}
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
