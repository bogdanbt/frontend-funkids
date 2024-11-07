import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setRole, clearRole } from "../redux/userSlice";
import { jwtDecode } from "jwt-decode";
const { v4: uuidv4 } = require("uuid"); // Импортируем uuid
function SingleLesson() {
    const { courseId, lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [course, setCourse] = useState(null);
    const [teacherId, setTeacherId] = useState(null);
    const [students, setStudents] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [isEditingAttendance, setIsEditingAttendance] = useState(false); // Режим редактирования посещаемости
    const [attendance, setAttendance] = useState({});
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let role, userId;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.id;
            role = decodedToken.role;
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                dispatch(clearRole());
                alert(
                    "Время действия токена истекло. Пожалуйста, войдите снова."
                );
            } else {
                dispatch(setRole(role));
            }
        } catch (error) {
            console.error("Ошибка декодирования токена:", error);
        }
    }

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(
                    `${config.apiBaseUrl}/courses/${courseId}`
                );
                const courseData = response.data;
                setTeacherId(courseData.teacherId);
                setCourse(courseData);
                const foundLesson = courseData.lessons.find(
                    (lesson) => lesson.id === lessonId
                );
                setLesson(foundLesson);

                // Запрос для получения данных о посещаемости для текущего урока
                const attendanceResponse = await axios.get(
                    `${config.apiBaseUrl}/lessons/${lessonId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                // const fetchedAttendance =
                //     attendanceResponse.data.attendees.reduce((acc, student) => {
                //         acc[student.studentId] = student.attended;
                //         return acc;
                //     }, {});
                // setAttendance(fetchedAttendance);
                setStudents(courseData.students); // Устанавливаем список студентов
                // Шаг 3: Запрашиваем полную информацию о студентах (имена)
                if (courseData.students && courseData.students.length > 0) {
                    const studentsResponse = await axios.post(
                        `${config.apiBaseUrl}/students/info`,
                        { studentIds: courseData.students },
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    setStudentsData(studentsResponse.data); // Сохраняем данные студентов в состоянии
                }
            } catch (error) {
                console.error("Ошибка при загрузке курса и урока:", error);
            }
        };
        fetchCourse();
    }, [courseId, lessonId, token]);

    const handleAttendance = async (studentEmail, attended) => {
        try {
            // Check if the student is already in the attendees list
            const attendeeCheck = await axios.get(
                `${config.apiBaseUrl}/lessons/${lessonId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const isAlreadyAttendee =
                attendeeCheck.data.attendees.includes(studentEmail);
            if (isAlreadyAttendee) {
                console.log(
                    `${studentEmail} is already in the attendees list.`
                );
                return; // Exit if the student is already in the list
            }

            const voucherCheck = await axios.get(
                `${config.apiBaseUrl}/vouchers`,
                {
                    params: { email: studentEmail, courseId },
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Define paymentStatus based on voucher availability
            const paymentStatus = voucherCheck.data.exists ? "paid" : "debt";
            const amount =
                voucherCheck.data.exists && voucherCheck.data.voucher
                    ? voucherCheck.data.voucher.amount
                    : 0;

            // Add an entry to ReportBook
            await axios.post(
                `${config.apiBaseUrl}/reportbook/add`,
                {
                    id: uuidv4(), // Generate a unique ID
                    date: lesson.lessonDate, // Use lesson date
                    userId: studentEmail,
                    courseId: courseId,
                    lessonId: lessonId,
                    userRole: "student",
                    paymentStatus: paymentStatus,
                    amount: amount,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            // Add the student to the attendees array in the lesson
            await axios.post(
                `${config.apiBaseUrl}/lessons/${lessonId}/add-attendee`,
                {
                    studentEmail: studentEmail,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log(
                `${studentEmail} has been added to attendees for lesson ${lessonId} with status ${paymentStatus}.`
            );

            // Delete one voucher if it exists
            if (voucherCheck.data.exists) {
                await axios.delete(`${config.apiBaseUrl}/vouchers`, {
                    data: { email: studentEmail, courseId },
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(`Ваучер для ${studentEmail} был удален.`);
            }
            // Update the local attendees array in lesson state to trigger re-render
            setLesson((prevLesson) => ({
                ...prevLesson,
                attendees: [...prevLesson.attendees, studentEmail],
            }));
        } catch (error) {
            console.error(
                "Ошибка при проверке ваучера или записи в ReportBook:",
                error
            );
        }
    };

    // Обработка отмены присутствия
    const handleAttendanceCancel = (studentEmail) => {
        console.log(`Отмена присутствия для ${studentEmail}`);
    };

    // const handleAttendanceChange = async (studentId, attended) => {
    //     if (!isEditingAttendance) return;
    //     setAttendance((prev) => ({ ...prev, [studentId]: attended }));

    //     try {
    //         if (attended) {
    //             // Отправляем запрос для добавления отметки о посещении
    //             await axios.post(
    //                 `${config.apiBaseUrl}/lessons/${lessonId}/attendance`,
    //                 { studentId, attended: true },
    //                 { headers: { Authorization: `Bearer ${token}` } }
    //             );
    //         } else {
    //             // Отправляем запрос для удаления отметки о посещении
    //             await axios.delete(
    //                 `${config.apiBaseUrl}/lessons/${lessonId}/attendance/${studentId}`,
    //                 { headers: { Authorization: `Bearer ${token}` } }
    //             );
    //         }
    //     } catch (error) {
    //         console.error("Ошибка при обновлении посещаемости:", error);
    //         alert("Не удалось обновить посещаемость.");
    //     }
    // };

    const handleDeleteLesson = async () => {
        try {
            const response = await axios.delete(
                `${config.apiBaseUrl}/courses/${courseId}/lessons/${lessonId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                alert("Урок успешно удален.");
                navigate(`/allcourses/${courseId}`);
            }
        } catch (error) {
            console.error("Ошибка при удалении урока:", error);
            alert("Не удалось удалить урок.");
        }
    };

    return lesson ? (
        <>
            <div className="container pt-3">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <h2>{lesson.title}</h2>
                        <p>{lesson.content}</p>
                        <p>
                            Дата урока:{" "}
                            {new Date(lesson.lessonDate).toLocaleDateString()}
                        </p>
                        {/* Отображаем дату */}
                        {(role === "admin" ||
                            (role === "teacher" && userId === teacherId)) && (
                            <div className="d-flex">
                                <Link
                                    to={`/allcourses/${courseId}/edit-lesson/${lessonId}`}
                                >
                                    <Button
                                        variant="secondary"
                                        className="mr-2"
                                    >
                                        Edit lesson
                                    </Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    onClick={handleDeleteLesson}
                                    className="ml-2"
                                >
                                    Delete lesson
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="col-md-4">
                        <img
                            src={lesson.foto}
                            alt="describe img"
                            className="img-fluid"
                        />
                    </div>
                </div>

                {(role === "admin" ||
                    (role === "teacher" && userId === teacherId)) && (
                    <div className="attendance-section mt-5 p-4 bg-light rounded shadow">
                        <h3 className="mb-4">Отметка посещаемости</h3>
                        <p>
                            <strong>
                                Количество зарегистрированных детей:
                            </strong>{" "}
                            {course.students.length}
                        </p>

                        <button
                            onClick={() =>
                                setIsEditingAttendance(!isEditingAttendance)
                            }
                            className={`btn ${
                                isEditingAttendance
                                    ? "btn-danger"
                                    : "btn-primary"
                            } mb-3`}
                        >
                            {isEditingAttendance
                                ? "Остановить редактирование"
                                : "Редактировать посещаемость"}
                        </button>

                        <ul className="list-group">
                            {studentsData.map((student) => (
                                <li
                                    key={student._id.toString()}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                    style={{
                                        backgroundColor:
                                            lesson &&
                                            lesson.attendees &&
                                            lesson.attendees.includes(
                                                student.email
                                            )
                                                ? "#d4edda" // Light green for attendees
                                                : "white",
                                    }}
                                >
                                    {student.fullName}
                                    <div>
                                        <Button
                                            variant="success"
                                            className="mr-2"
                                            onClick={() =>
                                                handleAttendance(student.email)
                                            }
                                            disabled={!isEditingAttendance}
                                        >
                                            Присутствует
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                handleAttendanceCancel(
                                                    student.email
                                                )
                                            }
                                            disabled={!isEditingAttendance}
                                        >
                                            Отмена присутствия
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    ) : (
        <p>Loading lesson data...</p>
    );
}
/* <Card className="mt-3">
                <Card.Img variant="top" src={lesson.photo} alt={lesson.title} />
                <Card.Body>
                    <Card.Title>{lesson.title}</Card.Title>
                    <p>
                        Количество зарегистрированных детей:{" "}
                        {course.students.length}
                    </p>
                    <Card.Text>{lesson.description}</Card.Text>
                    <Card.Text>{lesson.content}</Card.Text>

                            <h3 className="mt-4">Отметка посещаемости</h3>
                          <button
                                onClick={() =>
                                    setIsEditingAttendance(!isEditingAttendance)
                                }
                                className={`btn ${
                                    isEditingAttendance
                                        ? "btn-danger"
                                        : "btn-primary"
                                }`}
                            >
                                {isEditingAttendance
                                    ? "Остановить редактирование"
                                    : "Редактировать посещаемость"}
                            </button>

                            <ul className="mt-3">
                                {studentsData.map((student) => (
                                    <li key={student._id.toString()}>
                                        {student.fullName}
                                        <input
                                            type="checkbox"
                                            checked={
                                                attendance[
                                                    student._id.toString()
                                                ] || false
                                            }
                                            onChange={(e) =>
                                                handleAttendanceChange(
                                                    student._id.toString(),
                                                    e.target.checked
                                                )
                                            }
                                            disabled={!isEditingAttendance} // Чекбоксы отключены, если режим редактирования выключен
                                        />
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    ) : (
        <p>Загрузка данных об уроке...</p>
    );
} */

export default SingleLesson;
