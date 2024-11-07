import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { Card, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setRole, clearRole } from "../redux/userSlice";

const handleRegisterClick = async (courseId, navigate, userEmail) => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
    } else {
        try {
            const response = await axios.post(
                `${config.apiBaseUrl}/register-course`,
                {
                    email: userEmail, // Передаем email пользователя
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
    const { courseId } = useParams(); // Используем courseId из URL
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    let userId, role, userEmail;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.id;
            role = decodedToken.role;
            userEmail = decodedToken.email; // Получаем email из токена

            if (decodedToken.exp * 1000 > Date.now()) {
                dispatch(setRole(role));
            } else {
                localStorage.removeItem("token");
                dispatch(clearRole());
                alert("Время действия токена истекло, выполните вход снова.");
            }
        } catch (error) {
            console.error("Ошибка декодирования токена:", error);
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
                setLessons(response.data.lessons); // Получаем уроки из ответа
            } catch (error) {
                console.error("Ошибка при загрузке курса:", error);
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId]);

    const onDelete = async () => {
        if (!token) {
            alert("Вы должны войти в систему, чтобы удалить курс.");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.delete(
                `${config.apiBaseUrl}/courses/${courseId}`, // Используем courseId
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Курс успешно удален.");
                navigate("/allcourses");
            }
        } catch (error) {
            console.error("Ошибка при удалении курса:", error);
            alert("Не удалось удалить курс.");
        }
    };

    const onEdit = () => {
        navigate(`/edit-course/${courseId}`);
    };

    //модальное окно для админа
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    // Функция для получения списка студентов при открытии модального окна
    const openModal = async () => {
        setIsModalOpen(true);
        try {
            const response = await axios.get(
                `${config.apiBaseUrl}/students/list`
            );
            setStudents(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Ошибка при получении списка студентов:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStudents([]); // Очистка выбранных студентов при закрытии
    };

    const handleStudentSelect = (studentId) => {
        const student = students.find((student) => student._id === studentId);
        if (student) {
            setSelectedStudents((prevSelected) =>
                prevSelected.includes(student.email)
                    ? prevSelected.filter((email) => email !== student.email)
                    : [...prevSelected, student.email]
            );
            console.log(
                "Текущий список выбранных студентов:",
                selectedStudents
            ); // Отладка
        }
    };

    // const handleSubmit = async () => {
    //     try {
    //         await axios.post(
    //             `${config.apiBaseUrl}/courses/${courseId}/add-students`,
    //             {
    //                 studentIds: selectedStudents,
    //             }
    //         );
    //         alert("Студенты успешно добавлены на курс");
    //         closeModal();
    //     } catch (error) {
    //         console.error("Ошибка при добавлении студентов на курс:", error);
    //     }
    // };
    const handleSubmit = async () => {
        try {
            console.log("Отправка studentEmails на сервер:", selectedStudents); // Отладка
            await axios.post(
                `${config.apiBaseUrl}/courses/${courseId}/add-students`,
                {
                    studentIds: selectedStudents, // Передаем массив email студентов напрямую
                }
            );
            alert("Студенты успешно добавлены на курс");
            closeModal();
        } catch (error) {
            console.error("Ошибка при добавлении студентов на курс:", error);
        }
    };
    return course ? (
        <>
            <div className="container pt-3">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>

                        {(role === "admin" ||
                            (role === "teacher" &&
                                userId === course.teacherId)) && (
                            <div className="d-flex">
                                <Button
                                    variant="secondary"
                                    onClick={onEdit}
                                    className="ml-2"
                                >
                                    Edit course
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={onDelete}
                                    className="ml-2"
                                >
                                    Delete course
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={openModal}
                                    className="ml-2"
                                >
                                    Add students to course
                                </Button>
                                <Link to={`/allcourses/${courseId}/addlesson`}>
                                    <Button variant="primary" className="ml-2">
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
                                className="ml-2"
                            >
                                Registration
                            </Button>
                        )}
                    </div>
                    <div className="col-md-4">
                        <img
                            src={course.foto}
                            alt="Описание изображения"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Выберите студентов</h3>
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
                            Добавить выбранных студентов
                        </button>
                        <button onClick={closeModal}>Отмена</button>
                    </div>
                </div>
            )}
            <div>
                <h2 className="mb-4 text-center">Уроки</h2>

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
        </>
    ) : (
        <p>Loading course data...</p>
    );
}

export default SingleCourse;
