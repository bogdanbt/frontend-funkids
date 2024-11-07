import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config"; // Импорт базового URL для запросов

const StudentCard = ({ student }) => {
    return (
        <div className="student-card">
            <h3>{student.fullName}</h3>
            <p>Email: {student.email}</p>
            <h4>Курсы:</h4>
            {student.courses && student.courses.length > 0 ? (
                student.courses.map((course, index) => (
                    <div key={course.courseId || index}>
                        {" "}
                        {/* Добавлен ключ key */}
                        <p>Курс: {course.courseTitle}</p>
                        <p>Посещено уроков: {course.attendedLessons}</p>
                        <p>Количество ваучеров: {course.totalVouchers}</p>
                    </div>
                ))
            ) : (
                <p>Нет зарегистрированных курсов</p>
            )}
            <button
                onClick={() =>
                    alert(`Редактирование студента ${student.fullName}`)
                }
            >
                More
            </button>
        </div>
    );
};

const StudentsCardLibrary = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Получение списка студентов с данными о посещаемости и ваучерах
        axios
            .get(`${config.apiBaseUrl}/students/details`)
            .then((response) => setStudents(response.data))
            .catch((error) =>
                console.error("Ошибка при получении данных студентов:", error)
            );
    }, []);

    return (
        <div>
            <h2>Картотека всех детей</h2>
            <div className="students-list">
                {students.map((student) => (
                    <StudentCard key={student.email} student={student} />
                ))}
            </div>
        </div>
    );
};

export default StudentsCardLibrary;
