import React, { useState, useEffect } from "react";
import Course from "./Course";
import axios from "axios";
import config from "../config"; // Импортируем base url server конфигурацию

import { jwtDecode } from "jwt-decode";
function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken); // Убедитесь, что токен содержит роль
            // Проверяем, если роль пользователя — 'teacher'
            if (decodedToken.role === "teacher") {
                setIsTeacher(true);
            }
            console.log("isTeacher State:", isTeacher); // Проверяем состояние
        }
    }, []);

    // Отслеживаем обновление состояния
    useEffect(() => {
        console.log("isTeacher State updated:", isTeacher);
    }, [isTeacher]);
    ///
    // Используем useEffect для загрузки курсов при монтировании компонента
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    `${config.apiBaseUrl}/courses`
                );
                setCourses(response.data); // Обновляем состояние курсами из базы данных
            } catch (error) {
                console.error("Ошибка получения курсов:", error);
            }
        };

        fetchCourses();
    }, []); // Пустой массив указывает на то, что useEffect будет вызван один раз при монтировании компонента
    // Функция для удаления курса из локального состояния
    const removeCourseFromList = (courseId) => {
        setCourses(courses.filter((course) => course.id !== courseId));
    };
    return (
        <div className="justify-content-center">
            {courses.map((course) => (
                <Course
                    key={course.id}
                    courseId={course.id}
                    title={course.title}
                    description={course.description}
                    foto={course.foto}
                    isTeacher={isTeacher}
                    removeCourseFromList={removeCourseFromList} // Передаем функцию удаления
                    registerButton={true}
                />
            ))}
        </div>
    );
}

export default AllCourses;
